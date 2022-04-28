<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 28px">
        <!-- <el-menu :default-active="activeIndex" background-color="#b3b4d1" text-color="#2d2d36" active-text-color="#3a3a9d" class="el-menu-demo" mode="horizontal" @select="handleSelect"> -->
        <el-menu :default-active="activeIndex" background-color="#b3b4d1" text-color="#2d2d36" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">车位管理</template>
          <el-menu-item index="1-1" @click="parkInfo">车位信息</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">车主管理</template>
          <el-menu-item index="2-1" @click="userInfo">固定车主信息</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">车辆管理</template>
            <el-submenu index="3-1">
              <template slot="title">固定车辆</template>
              <el-menu-item index="3-1-1" @click="fixCarMsg">固定车辆信息</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2">
              <template slot="title">自由车辆</template>
              <el-menu-item index="3-2-1" @click="freeCarMsg">自由车辆信息</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">收费管理</template>
            <el-submenu index="4-1">
              <template slot="title">固定车位</template>
              <el-menu-item index="4-1-1" @click="fixPayMsg">固定车位收费信息</el-menu-item>
            </el-submenu>
            <el-submenu index="4-2">
              <template slot="title">自由车位</template>
              <el-menu-item index="4-2-1" @click="freePayMsg">自由车位收费信息</el-menu-item>
            </el-submenu>
        </el-submenu>

        <div>
        <span>停车场管理系统 </span>
        <el-button-group>
          <el-dropdown :hide-on-click="true">
            <span class="el-dropdown-link">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-setting arrow-right"
                circle
              ></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="admInfo">
                <el-dropdown-item>
                  <el-link type="primary">个人信息</el-link>
                </el-dropdown-item>
              </router-link>
              <router-link to="log">
                <el-dropdown-item>
                  <el-link type="danger">退出系统</el-link>
                </el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>
        </el-button-group>
        </div>
      </el-menu>
      </el-header>

      <el-container>
        <el-aside width="250px">
          <el-menu
            background-color="#cadae4"
            :default-openeds="['1', '2', '3', '4']"
          >
            <el-submenu index="1">
              <template slot="title" style="blod"
                ><i class="el-icon-location-information"></i>车位管理</template
              >
              <el-menu-item-group>
                <el-menu-item @click="parkInfo" index="1-1"
                  ><i class="el-icon-place"></i>车位信息</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-s-custom"></i>车主管理</template
              >
              <el-menu-item-group>
                <el-menu-item @click="userInfo" index="2-1"
                  ><i class="el-icon-postcard"></i>固定车主信息</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-truck"></i>车辆管理</template
              >
              <el-menu-item-group>
                <template slot="title">固定车辆</template>
                <el-menu-item @click="fixCarMsg" index="3-1"
                  ><i class="el-icon-lock"></i>固定车辆信息</el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group title="自由车辆">
                <el-menu-item @click="freeCarMsg" index="3-2"
                  ><i class="el-icon-unlock"></i>自由车辆信息</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title"
                ><i class="el-icon-time"></i>收费管理</template
              >
              <el-menu-item-group>
                <template slot="title">自由车位</template>
                <el-menu-item @click="freePayMsg" index="4-1"
                  ><i class="el-icon-tickets"></i>自由车位收费信息</el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group title="固定车位">
                <el-menu-item @click="fixPayMsg" index="4-2"
                  ><i class="el-icon-aim"></i>固定车位收费信息</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    parkInfo() {
      this.$router.push({ path: "/parkInfo" });
    },
    userInfo() {
      this.$router.push({ path: "/userInfo" });
    },
    fixCarMsg() {
      this.$router.push({ path: "/fixCarMsg" });
    },
    freeCarMsg() {
      this.$router.push({ path: "/freeCarMsg" });
    },
    freePayMsg() {
      this.$router.push({ path: "/freePayMsg" });
    },
    fixPayMsg() {
      this.$router.push({ path: "/fixPayMsg" });
    },
  },
};
</script>


<style>
.el-header {
  background-color: #b3b4d1;
  color: #333;
  text-align: center;
  line-height: 50px;
}

.el-aside {
  background-color: #cadae4 !important;
  color: #333;
  text-align: center;
  height: 644px;
}

.el-main {
  color: #333;
  text-align: center;
}
a {
  text-decoration: none;
}
</style>