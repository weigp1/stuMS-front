<script setup>
import { onMounted, ref } from 'vue'
import { NAvatar, NButton, NCard, NGi, NGradientText, NGrid, NStatistic } from 'naive-ui'

import AppPage from '@/components/common/AppPage.vue'
import { useUserStore } from '@/store'
import api from '@/api'

const { sid,name } = useUserStore()

const homeInfo = ref({
  view_count: 537,
  user_count: 14,
  article_count: 15,
  message_count: 37,
})

async function getHomeInfo() {
  try {
    const res = await api.getBackendUserNum() // Assuming getUserNum is the correct API function
    const res2 = await api.getUserNum() // Assuming getUserNum is the correct API function
    homeInfo.value.user_count = res.data
    homeInfo.value.view_count = res2.data
  } catch (error) {
    console.error('Error fetching home information:', error)
    // Handle error or set default values if necessary
  }
}

onMounted(async () => {
  getOneSentence()
  const res = await getHomeInfo()
  homeInfo.value = res.data
})

// 一言
const sentence = ref('')
async function getOneSentence() {
  fetch('https://v1.hitokoto.cn?c=i')
    .then(resp => resp.json())
    .then(data => sentence.value = data.hitokoto)
    .catch(() => sentence.value = '宠辱不惊，看庭前花开花落；去留无意，望天上云卷云舒。')
}
</script>

<template>
  <AppPage>
    <div class="flex-1">
      <NCard>
        <div class="flex items-center">
          <!-- <NAvatar round :size="60" :src="avatar" /> -->
          <div class="ml-5">
            <p> Hello, {{ name }} </p>
            <NGradientText class="mt-1 op-60" gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
              {{ sentence }}
            </NGradientText>
          </div>
          <!-- <div class="ml-auto flex items-center">
            <NStatistic label="Stars" class="w-[80px]">
              <a href="https://github.com/szluyu99/gin-vue-blog" target="_blank">
                <img
                  alt="stars"
                  src="https://badgen.net/github/stars/szluyu99/gin-vue-blog"
                >
              </a>
            </NStatistic>
            <NStatistic label="Forks" class="ml-10 w-[100px]">
              <a href="https://github.com/szluyu99/gin-vue-blog" target="_blank">
                <img
                  alt="forks"
                  src="https://badgen.net/github/forks/szluyu99/gin-vue-blog"
                >
              </a>
            </NStatistic>
          </div> -->
        </div>
      </NCard>

      <NGrid class="mt-4" x-gap="12" :cols="4">
        <template
          v-for="item of [
            { icon: 'i-fa6-solid:users', color: 'text-[#40C9C6]', label: '学生人数', key: 'view_count' },
            { icon: 'i-heroicons:users-solid', color: 'text-[#34BFA3]', label: '管理员人数', key: 'user_count' },
            { icon: 'i-material-symbols:article', color: 'text-[#F4516C]', label: '个人信息待审数', key: 'article_count' },
            { icon: 'i-bxs:comment-dots', color: 'text-[#36A3F7]', label: '综测待审数', key: 'message_count' },
          ]" :key="item.key"
        >
          <NGi>
            <NCard>
              <span
                class="text-[60px]"
                :class="[item.icon, item.color]"
              />
              <NStatistic class="float-right" :label="item.label">
                {{ homeInfo[item.key] ?? 'unknown' }}
              </NStatistic>
            </NCard>
          </NGi>
        </template>
      </NGrid>

      <!-- TODO: 完善首页设计 -->
      <!-- <NCard title="项目" size="small" class="mt-4">
        <template #header-extra>
          <NButton text type="primary">
            更多
          </NButton>
        </template>
        <NCard
          v-for="i in 5" :key="i"
          class="my-2 w-[300px] flex-shrink-0 cursor-pointer hover:shadow-lg"
          title="Gin Blog Admin"
          size="small"
        >
          <p class="op-60">
            这是中山大学软件工程学院的综测管理后台
          </p>
        </NCard>
      </NCard> -->
    </div>
  </AppPage>
</template>
