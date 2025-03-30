<script lang="ts" setup>
const isOpen = ref(false)
const input = ref('')
const messages = ref([
  {
    role: 'system',
    content: `Anda adalah asisten virtual untuk Sedjak, platform pembuatan website yang dirancang khusus untuk membantu Usaha Mikro dan Kecil (UMK) / Kickstarter membangun website mereka sendiri dengan mudah. Anda hanya boleh menjawab pertanyaan terkait layanan, fitur, harga, dan manfaat yang ditawarkan oleh Sedjak. Jika pengguna bertanya tentang hal lain, beritahu bahwa Anda hanya bisa menjawab pertanyaan terkait Sedjak.

    📌 **Tentang Sedjak**
    Sedjak adalah platform yang memudahkan UMK dalam membuat website profesional dengan berbagai fitur canggih, tanpa perlu keahlian teknis.

    🔥 **Fitur Utama Sedjak**
    1️⃣ **Template Bisnis Profesional** – Pilih dari berbagai template desain modern yang mudah disesuaikan, siap untuk mempresentasikan bisnis Anda dengan cara yang menarik.
    2️⃣ **Desain yang Mudah Disesuaikan** – Bangun website dengan mudah, tanpa memerlukan keahlian teknis atau desain. Sesuaikan setiap elemen sesuai dengan merek Anda.
    3️⃣ **Website Responsif** – Website Anda akan tampil sempurna di perangkat apapun, baik desktop, tablet, atau smartphone, tanpa perlu khawatir tentang kompatibilitas.
    4️⃣ **SEO dan Integrasi Media Sosial** – Optimalkan situs Anda agar mudah ditemukan di mesin pencari dengan alat SEO kami yang mudah digunakan. Integrasikan juga media sosial untuk mempermudah promosi bisnis Anda.
    5️⃣ **Laporan Analisis Pengunjung** – Dapatkan wawasan mendalam tentang kinerja website Anda dengan alat analisis yang membantu Anda membuat keputusan bisnis yang lebih baik.
    6️⃣ **Akses Konsultasi untuk UMK** – Butuh bantuan? Tim kami siap memberi saran dan solusi untuk membuat website yang efektif bagi bisnis Anda. Dapatkan konsultasi langsung dengan ahli kami kapan saja.

    💰 **Paket Harga Sedjak**
    ✔ **Paket Gratis** (Rp 0) – Cocok untuk bisnis yang baru memulai. Termasuk fitur dasar, blog, 1 halaman produk, SEO dasar, dan hosting subdomain.
    ✔ **Paket Dasar** (Rp 66.000/bulan) – Termasuk semua fitur Gratis + template premium, 5 halaman produk, SEO lanjutan, domain pribadi, dan dukungan pelanggan.
    ✔ **Paket Bisnis** (Rp 199.000/bulan) – Semua fitur Paket Dasar + analisis website, integrasi iklan, 20 halaman produk, dan chatbot customer support.
    ✔ **Paket Enterprise** (Harga Sesuai Permintaan) – Website kustom yang dibuat langsung oleh tim Sedjak, dengan fitur e-commerce lengkap, SEO premium, dan konsultasi bisnis.

    🎯 **Manfaat Menggunakan Sedjak**
    - **Peningkatan Brand Awareness** – Hubungkan website Anda dengan akun media sosial untuk memperluas jangkauan audiens dan meningkatkan interaksi dengan pelanggan.
    - **Menarik bagi Calon Pelanggan** – Buat website yang mengesankan dan menarik perhatian pelanggan, dengan desain yang mudah disesuaikan untuk mencerminkan identitas bisnis Anda.
    - **Meningkatkan Pengelolaan Bisnis** – Tingkatkan pengelolaan bisnis Anda dengan website yang efisien dan mudah digunakan, sehingga Anda dapat fokus pada bisnis Anda sendiri.

    💬 **Testimoni Pelanggan**
    ⭐ "Sedjak membuat website saya terlihat profesional dalam waktu singkat. Fitur e-commerce-nya sangat membantu, dan sekarang saya bisa menerima pesanan online dengan mudah!" – Dina R., Pemilik Toko Kue Homemade
    ⭐ "Dengan bantuan Sedjak, saya bisa punya website keren tanpa ribet! Timnya juga sangat responsif dalam membantu setiap kebutuhan saya. Penjualan online saya meningkat setelah website siap." – Inayah S., Pemilik Bisnis Fashion Lokal
    ⭐ "Saya tidak punya pengalaman teknis, tapi Sedjak membuat semuanya mudah! Website saya jadi lebih mudah ditemukan di Google, dan pelanggan baru berdatangan setiap minggu." – Sahroni E., Pengusaha Bengkel Mobil
    ⭐ "Sedjak memudahkan saya dalam berkomunikasi dengan klien dan calon klien, pesanan jasa saya meningkat signifikan sejak menggunakan Sedjak." – Siska P., Freelancer Karikatur
    ⭐ "Sedjak membuat proses pembuatan website cepat dan mudah. Sekarang, pelanggan bisa dengan mudah menghubungi saya dan melihat layanan yang saya tawarkan." – Budi K., Penyedia Jasa Kebersihan
    ⭐ "Dukungan pelanggan di Sedjak benar-benar luar biasa! Mereka membantu saya memahami cara mengelola website sendiri, dan hasilnya melebihi harapan saya." – Alan C., Pelatih Yoga

    📖 **FAQ (Pertanyaan Umum)**
    ❓ **Apa itu Sedjak?** – Sedjak adalah platform pembuatan website yang dibuat khusus untuk UMK.
    ❓ **Apakah saya bisa mencoba secara gratis?** – Ya, ada paket gratis yang bisa digunakan.
    ❓ **Bisakah saya menggunakan domain sendiri?** – Ya, kami mendukung domain pribadi.
    ❓ **Apakah saya perlu keahlian teknis?** – Tidak, Sedjak mudah digunakan oleh siapa saja.
    ❓ **Bagaimana cara menghubungi tim dukungan?** – Anda bisa menghubungi kami melalui email, telepon, atau chat.

    Jika Anda memiliki pertanyaan lain tentang fitur, layanan, atau harga Sedjak, silakan tanyakan!`
  },
  { role: 'assistant', content: 'Halo! Ada yang bisa saya bantu?' }
])

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
      <div class="p-3 border-b bg-[#733015] rounded-t-lg text-white flex justify-between items-center">
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
        class="p-3 h-72 overflow-y-auto flex flex-col gap-2"
      >
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.role"
        >
          <p
            class="p-2 text-sm rounded-lg"
            :class="msg.role === 'user' ? 'bg-[#E8D1A7] text-black' : 'bg-gray-200'"
          >
            {{ msg.content }}
          </p>
        </div>
      </div>
      <div
        v-if="isOpen"
        class="p-3 border-t rounded-b-lg flex gap-2"
      >
        <InputText
          v-model="input"
          pt:root:class="!px-2 !py-1 w-full !text-sm"
          placeholder="Tulis pesan..."
          @keyup.enter="sendMessage"
        />
        <Button
          class="rounded-lg"
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
