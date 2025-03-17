<script lang="ts" setup>
const isOpen = ref(false)
const input = ref('')
const messages = ref([{ role: 'assistant', content: 'Halo! Ada yang bisa saya bantu?' }])

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const sendMessage = async () => {
  if (!input.value.trim()) return

  messages.value.push({ role: 'user', content: input.value })
  input.value = ''

  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages: messages.value }),
  })
  const body = await response.json()
  messages.value.push(body)
}
</script>

<template>
  <div
    :class="[
      'fixed bottom-4 right-4 bg-white shadow-xl transition-all ease-in',
      isOpen ? 'w-80 rounded-lg' : 'w-16 h-16 rounded-full',
    ]"
  >
    <Button
      v-if="!isOpen"
      class="w-full h-full rounded-full"
      @click="toggleChat"
    >
      <Icon
        name="uil:chat-info"
        class="w-10 h-10 text-white"
      />
    </Button>
    <div v-else>
      <div class="p-3 border-b bg-[#733015] dark:border-zinc-800 rounded-t-lg text-white flex justify-between items-center">
        <span>Chatbot</span>
        <button
          class="text-lg"
          @click="toggleChat"
        >
          &times;
        </button>
      </div>
      <div
        v-if="isOpen"
        class="p-3 h-72 overflow-y-auto dark:bg-[#18181b] flex flex-col gap-2"
      >
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.role"
        >
          <p
            class="p-2 text-sm rounded-lg"
            :class="msg.role === 'user' ? 'bg-[#E8D1A7] text-black' : 'bg-gray-200 dark:bg-zinc-800 dark:text-white'"
          >
            {{ msg.content }}
          </p>
        </div>
      </div>
      <div
        v-if="isOpen"
        class="p-3 border-t rounded-b-lg dark:border-zinc-800 dark:bg-[#18181b] flex gap-2"
      >
        <InputText
          v-model="input"
          pt:root:class="!px-2 !py-1 w-full !text-sm"
          placeholder="Tulis pesan..."
          @keyup.enter="sendMessage"
        />
        <Button
          class="rounded-lg dark:text-white"
          pt:root:class="!px-3 !py-1 text-sm"
          label="Kirim"
          @click="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user {
  text-align: right;
}
.assistant {
  text-align: left;
}
</style>
