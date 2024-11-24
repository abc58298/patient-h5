<script setup lang="ts" name="PatientPage">
import { ref, onMounted, computed } from 'vue'
import type { PatientList, Patient } from '@/types/user'
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/user'
import { nameRules, idCardRules } from '@/utils/rules'
import { showSuccessToast, showConfirmDialog, type FormInstance, showFailToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
// const router = useRouter()
const patientList = ref<PatientList>([])
// 加载患者列表
const loadList = async () => {
  const res = await getPatientList()
  patientList.value = res.data
}
onMounted(() => {
  loadList()
})
const options = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 0,
  },
]

const initialPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0,
}
const patient = ref<Patient>({ ...initialPatient })

const show = ref(false)
const showPopup = (item?: Patient) => {
  // 编辑患者信息
  if (item) {
    const { id, name, idCard, gender, defaultFlag } = item
    //表单回填
    patient.value = { id, name, idCard, gender, defaultFlag }
  } else {
    //关闭时重进时重置表单和表单校验
    form.value?.resetValidation()
    patient.value = { ...initialPatient }
  }
  show.value = true
}

const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag ? true : false
  },
  set(value) {
    // value 它的值要么是true要么是false
    patient.value.defaultFlag = value ? 1 : 0
  },
})
// 提交
const form = ref<FormInstance>()
const submit = async () => {
  // 表单整体校验
  try {
    await form.value?.validate()
    // 身份证倒数第二位，1是男，0是女
    const gender = +patient.value.idCard.slice(-2, -1) % 2
    if (gender !== patient.value.gender) {
      await showConfirmDialog({
        title: '温馨提示',
        message: '填写的性别和身份证号中的不一致\n您确认提交吗？',
      })
    }
    // 如果有用户id，则执行编辑，否则执行添加
    if (patient.value.id) {
      await editPatient(patient.value)
    } else {
      await addPatient(patient.value)
    }

    // 提示
    showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
    // 关闭弹出层
    show.value = false
    // 重新加载患者列表
    loadList()
  } catch (error) {
    console.log(error)
  }
}
// 删除
const del = () => {
  showConfirmDialog({
    title: '提示',
    confirmButtonColor: 'red',
    message: `确定删除${patient.value.name}患者信息吗？`,
  })
    .then(async () => {
      await delPatient(patient.value.id as string)

      // 关闭弹出层
      show.value = false
      // 重新加载患者列表
      loadList()
    })
    .catch(() => {
      // on cancel
    })
}

// 获取参数，判断是否是选择换阵
const isSelect = computed(() => {
  return route.query.isSelect === '1'
})

const patientId = ref('')
// 选择患者
const selectPatient = (item: Patient) => {
  if (isSelect.value) {
    patientId.value = item.id!
  }
}
// const next = () => {
//   if (!patientId.value) return showFailToast('没有选择患者')

//   // 保存到仓库中
//   store.setPatientId(patientId.value)

//   // 跳转到支付页面
//   router.push('/consult/pay')
// }
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar :title="isSelect ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <!-- 头部提示 -->
    <div class="patient-change" v-if="isSelect">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in patientList"
        :key="item.id"
        @click="selectPatient(item)"
        :class="{ selected: item.id === patientId }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <!-- <span class="id">{{
            item.idCard.slice(0, 6) + '****' + item.idCard.slice(-4)
          }}</span> -->
          <!--身份证号脱敏-->
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="showPopup(item)">
          <SvgMap name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" v-if="patientList.length < 6" @click="showPopup()">
        <SvgMap name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <van-popup v-model:show="show" position="right">
      <NavBar
        :back="() => (show = false)"
        :title="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        @click-right="submit"
      />
      <van-form autocomplete="off" ref="form">
        <van-field label="真实姓名" v-model="patient.name" placeholder="请输入真实姓名" :rules="nameRules" />
        <van-field label="身份证号" v-model="patient.idCard" placeholder="请输入身份证号" :rules="idCardRules" />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <RadioButton :options="options" v-model="patient.gender" />
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" :icon-size="18" round />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="del">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
    <!-- 底部按钮 -->
    <div class="patient-next" v-if="isSelect">
      <van-button type="primary" round block>下一步</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
