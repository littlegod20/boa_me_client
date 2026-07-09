import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/core'
import { useTheme } from '../../context/ThemeContext'
import { useSocket } from '../../context/SocketContext'
import { useAuthStore } from '../../store/authStore'
import { fonts, layout, spacing, typography } from '../../constants/theme'
import { useGetConversationMessages } from '../../hooks/useConversations'
import { Message } from '../../types/conversation.types'
import { BookingsStackParamList } from '../../navigation/types'
import ChatHeader from '../../components/chat/ChatHeader'
import ChatInputBar from '../../components/chat/ChatInputBar'
import MessageBubble from '../../components/chat/MessageBubble'
import ChatDateSeparator, { formatDateLabel } from '../../components/chat/ChatDateSeparator'

type ChatScreenNavigationProp = StackNavigationProp<BookingsStackParamList, 'Chat'>
type ChatScreenRouteProp = RouteProp<BookingsStackParamList, 'Chat'>

type Props = {
  navigation: ChatScreenNavigationProp
  route: ChatScreenRouteProp
}

type ListItem =
  | { type: 'date'; id: string; label: string }
  | { type: 'message'; id: string; message: Message }

function buildListItems(messages: Message[]): ListItem[] {
  const items: ListItem[] = []
  let lastDate = ''

  for (const message of messages) {
    const dateKey = new Date(message.created_at).toDateString()
    if (dateKey !== lastDate) {
      lastDate = dateKey
      items.push({ type: 'date', id: `date-${dateKey}`, label: formatDateLabel(message.created_at) })
    }
    items.push({ type: 'message', id: message.id, message })
  }

  return items
}

const ChatScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme()
  const { socket } = useSocket()
  const currentUserId = useAuthStore((state) => state.user?.id)
  const { otherName, conversationId } = route.params
  const { data: conversationMessages, isLoading, isError } = useGetConversationMessages(conversationId)

  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const listRef = useRef<FlatList<ListItem>>(null)

  useEffect(() => {
    if (conversationMessages) setMessages(conversationMessages)
  }, [conversationMessages])

  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (message: Message) => {
      if (message.conversation_id !== conversationId) return
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev
        return [...prev, message]
      })
    }

    socket.on('new_message', handleNewMessage)
    return () => {
      socket.off('new_message', handleNewMessage)
    }
  }, [socket, conversationId])

  const listItems = useMemo(() => buildListItems(messages), [messages])

  const scrollToEnd = () => {
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }))
  }

  useEffect(() => {
    if (listItems.length) scrollToEnd()
  }, [listItems.length])

  const handleSend = () => {
    const content = draft.trim()
    if (!content || !socket) return

    socket.emit('send_message', { conversation_id: conversationId, content })
    setDraft('')
  }

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.type === 'date') {
      return <ChatDateSeparator label={item.label} />
    }
    const isOwn = item.message.sender_id === currentUserId
    return (
      <MessageBubble
        content={item.message.content}
        timestamp={item.message.created_at}
        isOwn={isOwn}
        isSeen={item.message.is_seen}
        isEdited={item.message.is_edited}
      />
    )
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.headerWrapper}>
        <ChatHeader
          name={otherName ?? 'Chat'}
          onBack={() => navigation.goBack()}
        />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior='padding'
        keyboardVerticalOffset={Platform.OS === 'ios' ? spacing.sm : 0}
      >
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : isError ? (
          <View style={styles.centered}>
            <Text style={[styles.message, { color: colors.error }]}>
              Something went wrong while loading this conversation
            </Text>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={listItems}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={scrollToEnd}
            ListEmptyComponent={
              <View style={styles.centered}>
                <Text style={[styles.message, { color: colors.textSecondary }]}>
                  No messages yet. Say hello!
                </Text>
              </View>
            }
          />
        )}

        <View style={styles.inputWrapper}>
          <ChatInputBar value={draft} onChangeText={setDraft} onSend={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: layout.screenPadding,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPadding - spacing.xs,
    paddingVertical: spacing.md,
  },
  inputWrapper: {
    paddingHorizontal: layout.screenPadding,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  message: {
    fontSize: typography.sizes.md,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
})

export default ChatScreen
