<script lang="ts" setup>
useSeoMeta({
  title: useRuntimeConfig().app.name,
  // description,
})

const features = ref([
  {
    icon: 'uil:window-grid',
    title: 'Template Bisnis Profesional',
    description: 'Pilih dari berbagai template desain modern yang mudah disesuaikan, siap untuk mempresentasikan bisnis Anda dengan cara yang menarik.',
    image: '/images/template-4.png',
  },
  {
    icon: 'uil:pen',
    title: 'Desain yang Mudah Disesuaikan',
    description: 'Bangun website dengan mudah, tanpa memerlukan keahlian teknis atau desain. Sesuaikan setiap elemen sesuai dengan merek Anda.',
    image: '/images/f90552fb4037c2f21cbeef375c0a97fa.png',
  },
  {
    icon: 'uil:laptop',
    title: 'Website Responsif',
    description: 'Website Anda akan tampil sempurna di perangkat apapun, baik desktop, tablet, atau smartphone, tanpa perlu khawatir tentang kompatibilitas.',
    image: '/images/3832664de49a2b6db7615480fb770fc8.png',
  },
  {
    icon: 'uil:globe',
    title: 'SEO dan Integrasi Media Sosial',
    description: 'Optimalkan situs Anda agar mudah ditemukan di mesin pencari dengan alat SEO kami yang mudah digunakan. Integrasikan juga media sosial untuk mempermudah promosi bisnis Anda.',
    image: '/images/49cd1df44622f5c2383d25ce80e59bfd.png',
  },
  {
    icon: 'uil:analytics',
    title: 'Laporan Analisis Pengunjung',
    description: 'Dapatkan wawasan mendalam tentang kinerja website Anda dengan alat analisis yang membantu Anda membuat keputusan bisnis yang lebih baik.',
    image: '/images/da6b758f82a62655d960839401b49d04.png',
  },
  {
    icon: 'uil:headphones',
    title: 'Akses Konsultasi untuk UMKM',
    description: 'Butuh bantuan? Tim kami siap memberi saran dan solusi untuk membuat website yang efektif bagi bisnis Anda. Dapatkan konsultasi langsung dengan ahli kami kapan saja.',
    image: '/images/4502d133ec6acc5cc68dd0a88fbcae8c.png',
  },
])
const benefits = ref([
  {
    icon: 'uil:assistive-listening-systems',
    title: 'Peningkatan Brand Awareness',
    description: 'Hubungkan website Anda dengan akun media sosial untuk memperluas jangkauan audiens dan meningkatkan interaksi dengan pelanggan.',
  },
  {
    icon: 'uil:heart',
    title: 'Menarik untuk Calon Pelanggan',
    description: 'Buat website yang mengesankan dan menarik perhatian pelanggan, dengan desain yang mudah disesuaikan untuk mencerminkan identitas bisnis Anda.',
  },
  {
    icon: 'uil:chart-line',
    title: 'Meningkatkan Pengelolaan Bisnis',
    description: 'Tingkatkan pengelolaan bisnis Anda dengan website yang efisien dan mudah digunakan, sehingga Anda dapat fokus pada bisnis Anda sendiri.',
  },
])
const pricings = ref([
  {
    title: 'Paket Gratis',
    description: 'Usaha kecil yang baru memulai bisnis',
    pricing: 'Gratis',
    unit: null,
    highlight: false,
    features: [
      'Pilih dari template dasar yang dapat disesuaikan',
      'Desain responsif untuk perangkat mobile',
      'Fitur blog dan halaman statis',
      '1 halaman produk/layanan',
      'Pengaturan SEO dasar',
      'Hosting dengan subdomain (namabisnis.Sedjak)',
    ],
  },
  {
    title: 'Paket Dasar',
    description: 'Website profesional UMKM',
    pricing: 'Rp40.000',
    unit: 'bulan',
    highlight: false,
    features: [
      'Semua fitur pada Paket Gratis',
      'Pilihan template premium yang lebih banyak',
      'Fitur e-commerce (tambah produk, sistem pembayaran, pengelolaan pesanan)',
      'Desain yang dapat disesuaikan sepenuhnya',
      '5 halaman produk atau layanan',
      'Pengaturan SEO lanjutan',
      'Hosting dengan domain pribadi (namabisnis.com)',
      'Integrasi media sosial',
      'Dukungan pelanggan lewat chat dan email',
    ],
  },
  {
    title: 'Paket Bisnis',
    description: 'Website dengan fokus pemasaran dan penjualan',
    pricing: 'Rp100.000',
    unit: 'bulan',
    highlight: true,
    features: [
      'Semua fitur pada Paket Dasar',
      'Analisis dan laporan kinerja website',
      'Pembayaran dan pengelolaan pesanan multi-mata uang',
      '20 halaman produk atau layanan',
      'Integrasi dengan platform pemasaran (Google Ads, Facebook Ads)',
      'Pengoptimalan SEO tingkat lanjut (kata kunci, metadata)',
      'Dukungan prioritas via telepon dan email',
      'Backup dan pemulihan data otomatis',
      'Fitur chatbot untuk customer support',
    ],
  },
  {
    title: 'Paket Enterprise',
    description: 'Website yang sesuai dengan keinginanmu, langsung jadi',
    pricing: 'Hubungi Kami',
    unit: null,
    highlight: false,
    features: [
      'Pembuatan website khusus oleh tim Sedjak (desain dan pengaturan awal)',
      'Konsultasi bisnis untuk memahami kebutuhan website yang spesifik',
      'Template premium yang disesuaikan dengan identitas merek bisnis Anda',
      'Fitur e-commerce lengkap (katalog produk, sistem pembayaran, pengelolaan pesanan)',
      'Pembuatan hingga 10 halaman (Beranda, Tentang Kami, Produk/Layanan, Blog, Kontak, dll.)',
      'Pengaturan integrasi Google Analytics untuk analisis kinerja website',
      'Laporan awal dan pelatihan dasar untuk pengelolaan website',
    ],
  },
])
const testimonials = ref([
  {
    name: 'Dina R.',
    role: 'Pemilik Toko Kue Homemade',
    content: 'Sedjak membuat website saya terlihat profesional dalam waktu singkat. Fitur e-commerce-nya sangat membantu, dan sekarang saya bisa menerima pesanan online dengan mudah!',
  },
  {
    name: 'Inayah S.',
    role: 'Pemilik Bisnis Fashion Lokal',
    content: 'Dengan bantuan Sedjak, saya bisa punya website keren tanpa ribet! Timnya juga sangat responsif dalam membantu setiap kebutuhan saya. Penjualan online saya meningkat setelah website siap.',
  },
  {
    name: 'Sahroni E.',
    role: 'Pengusaha Bengkel Mobil',
    content: 'Saya tidak punya pengalaman teknis, tapi Sedjak membuat semuanya mudah! Website saya jadi lebih mudah ditemukan di Google, dan pelanggan baru berdatangan setiap minggu.',
  },
  {
    name: 'Siska P.',
    role: 'Freelancer Karikatur',
    content: 'Sedjak memudahkan saya dalam berkomunikasi dengan klien dan calon klien, pesanan jasa saya meningkat signifikan sejak menggunakan Sedjak.',
  },
  {
    name: 'Budi K.',
    role: 'Penyedia Jasa Kebersihan',
    content: 'Sedjak membuat proses pembuatan website cepat dan mudah. Sekarang, pelanggan bisa dengan mudah menghubungi saya dan melihat layanan yang saya tawarkan.',
  },
  {
    name: 'Alan C.',
    role: 'Pelatih Yoga',
    content: 'Dukungan pelanggan di Sedjak benar-benar luar biasa! Mereka membantu saya memahami cara mengelola website sendiri, dan hasilnya melebihi harapan saya.',
  },
  {
    name: 'Muhammad Z.',
    role: 'Pengelola Restoran',
    content: 'Website dari Sedjak bukan hanya bagus, tapi juga berfungsi maksimal. Pelanggan sekarang bisa melihat menu dan reservasi online, dan itu benar-benar membantu meningkatkan omzet saya!',
  },
  {
    name: 'Taufiq L.',
    role: 'Pemilik Toko E-Commerce',
    content: 'Website dari Sedjak sangat profesional dan sesuai dengan brand saya. Tidak hanya membantu saya terlihat lebih kredibel, tetapi juga memperluas jangkauan klien yang saya dapatkan!',
  },
  {
    name: 'Rina A.',
    role: 'Pemilik Salon Kecantikan',
    content: 'Sedjak membantu saya membuat website yang elegan dan fungsional. Sekarang, pelanggan bisa booking layanan secara online, dan bisnis saya semakin berkembang!',
  },
  {
    name: 'Fajar H.',
    role: 'Pemilik Studio Fotografi',
    content: 'Website dari Sedjak sangat membantu memamerkan portofolio saya. Klien baru mudah menemukan saya, dan proyek fotografi saya meningkat pesat!',
  },
  {
    name: 'Lina M.',
    role: 'Pemilik Toko Buku Online',
    content: 'Sedjak membuat website toko buku saya terlihat menarik dan mudah dinavigasi. Penjualan meningkat drastis sejak pelanggan bisa berbelanja dengan nyaman!',
  },
  {
    name: 'Rizky P.',
    role: 'Pemilik Jasa Tour Guide',
    content: 'Website dari Sedjak membantu saya mempromosikan paket tur saya dengan lebih baik. Sekarang, pemesanan online meningkat, dan saya bisa fokus pada layanan!',
  },
  {
    name: 'Nadia W.',
    role: 'Pemilik Bisnis Katering',
    content: 'Sedjak membuat website katering saya terlihat profesional dan mudah digunakan. Pelanggan bisa melihat menu dan memesan langsung melalui website!',
  },
  {
    name: 'Hendra T.',
    role: 'Pemilik Toko Elektronik',
    content: 'Website dari Sedjak sangat membantu meningkatkan penjualan toko elektronik saya. Fitur e-commerce-nya mudah digunakan dan pelanggan sangat puas!',
  },
  {
    name: 'Yuni S.',
    role: 'Pemilik Studio Tato',
    content: 'Sedjak membantu saya membuat website yang mencerminkan gaya studio tato saya. Sekarang, klien bisa melihat portofolio dan booking janji dengan mudah!',
  },
  {
    name: 'Rudi F.',
    role: 'Pemilik Jasa Desain Grafis',
    content: 'Website dari Sedjak sangat membantu memamerkan karya saya. Klien baru mudah menemukan saya, dan proyek desain saya semakin banyak!',
  },
  {
    name: 'Dewi L.',
    role: 'Pemilik Toko Aksesoris',
    content: 'Sedjak membuat website toko aksesoris saya terlihat cantik dan fungsional. Penjualan online meningkat pesat sejak website diluncurkan!',
  },
  {
    name: 'Ahmad R.',
    role: 'Pemilik Jasa Pengiriman',
    content: 'Website dari Sedjak membantu saya mengelola pesanan pengiriman dengan lebih efisien. Pelanggan sangat puas dengan kemudahan yang diberikan!',
  },
  {
    name: 'Sari N.',
    role: 'Pemilik Bisnis Kerajinan Tangan',
    content: 'Sedjak membantu saya membuat website yang menampilkan produk kerajinan tangan saya dengan indah. Penjualan meningkat dan saya bisa menjangkau lebih banyak pelanggan!',
  },
  {
    name: 'Irfan K.',
    role: 'Pemilik Jasa Servis AC',
    content: 'Website dari Sedjak membuat bisnis servis AC saya terlihat lebih profesional. Pelanggan bisa booking layanan dengan mudah, dan bisnis saya semakin berkembang!',
  },
  {
    name: 'Maya D.',
    role: 'Pemilik Toko Bunga',
    content: 'Sedjak membantu saya membuat website toko bunga yang cantik dan fungsional. Pelanggan bisa memesan bunga online dengan mudah, dan penjualan meningkat pesat!',
  },
  {
    name: 'Rizki A.',
    role: 'Pemilik Jasa Desain Interior',
    content: 'Website dari Sedjak sangat membantu memamerkan portofolio desain interior saya. Klien baru mudah menemukan saya, dan proyek saya semakin banyak!',
  },
  {
    name: 'Lia W.',
    role: 'Pemilik Bisnis Makanan Sehat',
    content: 'Sedjak membuat website bisnis makanan sehat saya terlihat profesional dan mudah digunakan. Pelanggan bisa memesan menu sehat dengan cepat dan praktis!',
  },
  {
    name: 'Andi S.',
    role: 'Pemilik Jasa Tour Travel',
    content: 'Website dari Sedjak membantu saya mempromosikan paket tour travel dengan lebih baik. Pemesanan online meningkat, dan bisnis saya semakin berkembang!',
  },
  {
    name: 'Rina K.',
    role: 'Pemilik Toko Perlengkapan Bayi',
    content: 'Sedjak membuat website toko perlengkapan bayi saya terlihat menarik dan mudah digunakan. Penjualan online meningkat pesat sejak website diluncurkan!',
  },
  {
    name: 'Firman A.',
    role: 'Pemilik Jasa Desain Website',
    content: 'Website dari Sedjak sangat membantu memamerkan portofolio desain website saya. Klien baru mudah menemukan saya, dan proyek saya semakin banyak!',
  },
])
const faq = ref([
  {
    question: 'Apa itu Sedjak?',
    answer: 'Sedjak adalah solusi website yang dirancang khusus untuk membantu UMKM membangun website mereka sendiri.',
  },
  {
    question: 'Apa saja paket harga yang tersedia di Sedjak?',
    answer: 'Kami menyediakan berbagai paket harga sesuai dengan kebutuhan bisnis Anda, mulai dari paket gratis hingga paket enterprise.',
  },
  {
    question: 'Apakah saya bisa mencoba Sedjak secara gratis?',
    answer: 'Ya, kami menyediakan paket gratis untuk membantu Anda mencoba website dari Sedjak.',
  },
  {
    question: 'Bisakah saya menggunakan domain saya sendiri?',
    answer: 'Ya, kami menyediakan opsi untuk menggunakan domain pribadi Anda. Namun, kami juga menyediakan opsi untuk menggunakan subdomain dari kami (namabisnis.sedjak.com).',
  },
  {
    question: 'Apakah saya perlu keahlian teknis untuk menggunakan Sedjak?',
    answer: 'Tidak, Sedjak dibuat agar bisa digunakan oleh siapa saja, termasuk yang tidak memiliki pengalaman teknis. Dengan alat seret-dan-lepas yang sederhana, Anda bisa membuat website yang menarik dalam waktu singkat.',
  },
  {
    question: 'Apakah Sedjak menawarkan konsultasi atau bantuan untuk UMKM?',
    answer: 'Ya, kami menyediakan konsultasi langsung dengan ahli kami untuk membantu Anda memilih dan membangun website yang sesuai dengan bisnis Anda.',
  },
  {
    question: 'Bagaimana cara menghubungi tim dukungan Sedjak?',
    answer: 'Anda bisa menghubungi tim dukungan kami melalui email, telepon, atau chat. Kami senang membantu Anda dengan segala pertanyaan dan masalah yang Anda hadapi.',
  },
])

function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div>
    <div class="bg-[#E8D1A7]">
      <AppHeader
        class="pt-12 px-12"
        @scroll-to="scrollToSection"
      />
    </div>
    <div
      id="content"
    >
      <div
        id="home-introduction"
        class="flex flex-col gap-8 items-center"
        style="background-image: linear-gradient(to bottom, #E8D1A7, #A77756);"
      >
        <div class="py-12 px-8 md:px-12 flex flex-col gap-8 items-center">
          <p class="font-bold md:text-4xl/[56px] text-xl/[36px] text-center ">
            Bangun Website Profesional Anda
            <br>
            dengan Mudah bersama Sedjak
          </p>
          <p class="text-center">
            Sedjak menawarkan alat pembuat website yang sederhana,cepat, dan dapat disesuaikan,
            <br>
            ideal untuk UMKM yang ingin tampil profesional di dunia digital.
          </p>
          <div>
            <Button pt:root:class="!px-2 !py-1 !min-w-0 hover:scale-105 !transition-all">
              <NuxtLink
                v-if="$auth.loggedIn"
                class="font-semibold text-sm"
                to="/dashboard"
              >
                Buat Website-mu Sekarang
              </NuxtLink>
              <NuxtLink
                v-else
                class="font-semibold text-sm"
                to="/api/login"
                external
              >
                Buat Website-mu Sekarang
              </NuxtLink>
            </Button>
          </div>
        </div>
        <div class="mx-12">
          <img
            class="w-full rounded-t-2xl aspect-[3/1] object-cover"
            src="/images/1a1836d6b2cc78abcfe3c7405489867c.png"
          >
        </div>
      </div>
      <div
        id="home-features"
        style="background-image: radial-gradient(#A77756 5%, #E8D1A7 60%);"
      >
        <div class="py-12 px-8 md:px-12 flex flex-col gap-8 items-center">
          <p class="font-bold md:text-4xl/[56px] text-xl/[36px] text-center ">
            Fitur yang Tersedia untuk Memudahkan UMKM
            <br>
            dalam Membangun Website
          </p>
          <p class="text-center">
            Dengan berbagai fitur yang mudah digunakan, Sedjak memudahkan Anda
            <br>
            untuk membuat website yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>
        <div
          :class="[
            'grid grid-cols-1 px-[3rem] gap-4',
            'sm:grid-cols-2 sm:px-[4rem] sm:gap-6',
            'md:grid-cols-3 md:px-[6rem] md:gap-8',
            'lg:grid-cols-3 lg:px-[12rem] lg:gap-12',
          ]"
        >
          <Card
            v-for="feature in features"
            :key="feature.title"
            class="!bg-[#FDEAD5]"
          >
            <template #title>
              <div>
                <img
                  class="rounded-2xl aspect-[3/2] object-cover"
                  :src="feature.image"
                >
              </div>
              <div class="mt-4 flex gap-4 items-center">
                <Icon :name="feature.icon" />
                <p class="font-semibold">
                  {{ feature.title }}
                </p>
              </div>
            </template>
            <template #content>
              <p>
                {{ feature.description }}
              </p>
            </template>
          </Card>
        </div>
      </div>
      <div
        id="home-benefits"
        class="bg-[#E8D1A7]"
      >
        <div class="py-12 px-8 flex flex-col gap-8 items-center">
          <p class="font-bold md:text-4xl/[56px] text-xl/[36px] text-center ">
            Raih Penjualan Lebih Tinggi
            <br>
            dengan menggunakan Sedjak untuk Bisnis Anda
          </p>
          <p class="text-center">
            Buat penjualan anda meningkat dengan website yang professional.
            <br>
            Sedjak memberi Anda semua yang Anda butuhkan untuk membangun website yang profesional.
          </p>
        </div>
        <div
          :class="[
            'px-12 md:h-[980px] flex flex-col justify-between gap-4 md:gap-12',
            'lg:h-[520px] lg:flex-row',
          ]"
        >
          <div
            :class="[
              'flex flex-col justify-between gap-4 md:gap-12',
              'lg:flex-col',
            ]"
          >
            <Card
              v-for="benefit in benefits"
              :key="benefit.title"
              class="flex items-center my-4 !bg-[#FDEAD5]"
            >
              <template #content>
                <div class="flex gap-4 lg:items-center items-start">
                  <div class="pt-2 px-2 pb-[0.5px] bg-white rounded-2xl">
                    <Icon
                      :name="benefit.icon"
                      class="bg-[#733015] w-12 h-12"
                    />
                  </div>
                  <div class="flex flex-col">
                    <p class="font-semibold text-lg">
                      {{ benefit.title }}
                    </p>
                    <p>
                      {{ benefit.description }}
                    </p>
                  </div>
                </div>
              </template>
            </Card>
          </div>
          <img
            class="aspect-[2/1] object-cover rounded-2xl"
            src="/images/4e0faf0a6fef33b676f28a6f4b48779c.png"
          >
        </div>
      </div>
      <div
        id="home-pricing"
        style="background-image: linear-gradient(to bottom, #E8D1A7, #85582E);"
      >
        <div class="py-12 px-8 flex flex-col gap-8 items-center">
          <p class="font-bold md:text-4xl/[56px] text-xl/[36px] text-center ">
            Paket Harga Sedjak
            <br>
            Sesuai dengan Kebutuhan Bisnis Anda
          </p>
          <p class="text-center">
            Pilih paket yang dirancang khusus untuk membantu UMKM membangun website profesional,
            <br>
            dari solusi gratis hingga layanan penuh dari tim ahli kami.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-12 gap-8">
          <Card
            v-for="pricing in pricings"
            :key="pricing.title"
            class="hover:scale-105 transition-all"
            :class="{
              '!bg-[#FDEAD5] !text-black': !pricing.highlight,
              '!bg-[#733015] border border-white !text-white': pricing.highlight,
            }"
            pt:body="h-full"
            pt:content="flex-1"
          >
            <template #title>
              <div class="flex flex-col gap-2">
                <p class="font-semibold">
                  {{ pricing.title }}
                </p>
                <p class="!font-normal text-sm">
                  {{ pricing.description }}
                </p>
              </div>
            </template>
            <template #content>
              <div class="flex flex-col h-full justify-between">
                <div class="flex flex-1 flex-col">
                  <div class="flex flex-col lg:flex-row lg:items-center gap-2">
                    <p
                      v-if="pricing.pricing"
                      class="font-bold text-3xl"
                    >
                      {{ pricing.pricing }}
                    </p>
                    <p
                      v-if="pricing.unit"
                      class="!font-normal text-sm"
                    >
                      /{{ pricing.unit }}
                    </p>
                  </div>
                  <div class="flex flex-col gap-4 !font-normal mt-4 text-sm flex-1">
                    <div
                      v-for="feature in pricing.features"
                      :key="feature"
                      class="flex gap-2 items-center"
                    >
                      <Icon
                        name="uil:check"
                        class="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                      />
                      {{ feature }}
                    </div>
                  </div>
                </div>

                <!-- Button container -->
                <div class="mt-auto pt-4">
                  <Button pt:root:class="w-full !px-2 !py-1 !min-w-0 !bg-white !text-black !border-white hover:scale-105 !transition-all">
                    <NuxtLink
                      class="w-full font-semibold text-sm"
                    >
                      Mulai Sekarang
                    </NuxtLink>
                  </Button>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div class="flex justify-center mt-12">
          <Button pt:root:class="!px-2 !py-1 !min-w-0 !bg-white !text-black !border-white hover:scale-105 !transition-all">
            <NuxtLink
              class="font-semibold text-sm"
            >
              Lihat Semua Paket
            </NuxtLink>
          </Button>
        </div>
      </div>
      <div
        id="home-testimonials"
        class="bg-[#85582E]"
      >
        <div class="py-12 px-8 flex flex-col gap-8 items-center">
          <p class="font-bold md:text-4xl/[56px] text-xl/[36px] text-center text-white">
            Apa Kata Mereka tentang Sedjak?
          </p>
          <p class="text-center text-white">
            UMKM dari berbagai bidang telah merasakan kemudahan dan dampak positif dari website yang kami bangun.
            <br>
            Berikut pengalaman mereka.
          </p>
        </div>
        <div class="flex relative h-[240px] overflow-hidden">
          <!-- First Line (8 cards - double set) -->
          <div class="absolute top-8 flex animate-scroll gap-4">
            <Card
              v-for="testimonial in testimonials.slice().reverse()"
              :key="testimonial.name"
              class="w-72 !bg-[#FDEAD5] !text-black flex-shrink-0"
            >
              <template #title>
                <div class="flex items-center gap-4">
                  <Icon
                    name="uil:user"
                    class="w-8 h-8"
                  />
                  <div class="flex flex-col">
                    <p class="text-sm font-semibold">
                      {{ testimonial.name }}
                    </p>
                    <p class="text-xs font-light">
                      {{ testimonial.role }}
                    </p>
                  </div>
                </div>
              </template>
              <template #content>
                <p class="m-0 text-xs">
                  {{ testimonial.content }}
                </p>
              </template>
            </Card>
          </div>

          <!-- Second Line (8 cards - double set) -->
          <!-- <div class="absolute top-[220px] flex animate-scroll gap-4 -ml-36">
            <Card
              v-for="testimonial in testimonials"
              :key="testimonial.name"
              class="w-72 !bg-[#FDEAD5] !text-black flex-shrink-0"
            >
              <template #title>
                <div class="flex items-center gap-4">
                  <Icon
                    name="uil:user"
                    class="w-8 h-8"
                  />
                  <div class="flex flex-col">
                    <p class="text-sm font-semibold">
                      {{ testimonial.name }}
                    </p>
                    <p class="text-xs font-light">
                      {{ testimonial.role }}
                    </p>
                  </div>
                </div>
              </template>
              <template #content>
                <p class="m-0 text-xs">
                  {{ testimonial.content }}
                </p>
              </template>
            </Card>
          </div> -->
        </div>
      </div>
      <div
        id="home-faq"
        style="background-image: linear-gradient(to bottom, #85582E, #E8D1A7);"
      >
        <div class="py-12 px-8 flex flex-col gap-8 items-center">
          <p class="font-bold md:text-4xl/[56px] text-xl/[36px] text-center text-white">
            Pertanyaan Umum tentang Sedjak
          </p>
          <p class="text-center text-white">
            Temukan jawaban dari pertanyaan umum tentang layanan dan fitur Sedjak             <br>
            yang dirancang khusus untuk membantu UMKM membangun website mereka.
          </p>
        </div>
        <div class="pb-12 flex flex-col md:flex-row justify-between px-12 gap-12">
          <div class="basis-1/2 lg:basis-1/3">
            <img
              class="aspect-[3/7] lg:aspect-[3/4] object-cover rounded-2xl"
              src="/images/4502d133ec6acc5cc68dd0a88fbcae8c.png"
            >
          </div>
          <div class="basis-1/2 lg:basis-2/3 flex flex-col gap-4">
            <Panel
              v-for="panel in faq"
              :key="panel.question"
              toggleable
              :collapsed="true"
              class="!bg-[#FDEAD5] !border-0"
              pt:pctogglebutton:root:class="!text-black"
            >
              <template #header>
                <p class="font-semibold text-sm text-black">
                  {{ panel.question }}
                </p>
              </template>
              <p class="text-xs text-black">
                {{ panel.answer }}
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </div>
    <div class="p-12 bg-[#E8D1A7]">
      <AppFooter
        class="rounded rounded-2xl h-[400px]"
        @scroll-to="scrollToSection"
      />
    </div>
    <ChatBot />
  </div>
</template>

<style>
@keyframes scroll {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(calc(-20%));
  }
}

.animate-scroll {
  animation: scroll 15s linear infinite;
}
</style>
