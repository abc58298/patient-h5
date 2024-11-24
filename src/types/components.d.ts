import NavBar from "@/components/NavBar.vue"
import SvgMap from "@/components/SvgMap.vue"
import RadioButton from "@/components/RadioButton.vue"
declare module "vue"{
  interface GlobalComponents{
    NavBar:typeof NavBar
    SvgMap:typeof SvgMap,
    RadioButton:typeof RadioButton
  }
}
//全局声明组件类型
