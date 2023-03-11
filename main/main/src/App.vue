<script setup lang="ts">
import { onMounted, ref } from "vue";
import { registerMicroApps } from "@ice/stark/lib/apps";
import appHistory from "@ice/stark/lib/appHistory";
import start from "@ice/stark/lib/start";

interface EventFace {
  on: (name: string, callback: Function) => void;
  emit: (name: string, ...args: Array<any>) => void;
  off: (name: string, fn: Function) => void;
  once: (name: string, fn: Function) => void;
}

interface List {
  [key: string]: Array<Function>;
}

const route = ref("");
console.log(123);

onMounted(async () => {
  const appContainer = document.querySelector("#app-container") as HTMLElement;

  registerMicroApps([
    {
      name: "app45456",
      activePath: "/app1",
      title: "test",
      container: appContainer,
      loadScriptMode: "import",
      entry: `http://localhost:8091/index.html`,
    },
  ]);

  start({
    onRouteChange(_, pathname) {
      route.value = pathname;
    },
    onError(e) {
      console.log(e);
    },
  });
});

class Dispatch implements EventFace {
  list: List;
  constructor() {
    this.list = {};
  }

  on(name: string, callback: Function) {
    const callbackList: Array<Function> = this.list[name] || [];
    callbackList.push(callback);
    this.list[name] = callbackList;
  }

  emit(name: string, list = []) {
    let evnetName = this.list[name];
    if (evnetName) {
      evnetName.forEach((fn: Function) => {
        fn.apply(this, list);
      });
    } else {
      console.error("该事件未监听");
    }
  }

  off(name: string, fn: Function) {
    let evnetName = this.list[name];
    if (evnetName && fn) {
      let index = evnetName.findIndex((fns) => fns === fn);
      evnetName.splice(index, 1);
    } else {
      console.error("该事件未监听");
    }
  }

  once(name: string, fn: Function) {
    let decor = (...args: Array<any>) => {
      fn.apply(this, args);
      this.off(name, decor);
    };
    this.on(name, decor);
  }
}
// @ts-ignore
window.dispatch = new Dispatch();
</script>

<template>
  <div>
    主应用
    <button @click="appHistory.push('/')">main</button>
    <button @click="appHistory.push('/app1')">app1</button>
    <button @click="appHistory.push('/app1/list')">app1 page</button>
    <div id="app-container"></div>
  </div>
</template>

<style scoped></style>
