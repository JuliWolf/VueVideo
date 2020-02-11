<template>
  <div id="app">
    <ul class="flex">
      <li class="mr-3">
        <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white">
          <router-link to="/">Home</router-link>
        </a>
      </li>
      <li>
        <a class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3">
          <router-link to="/videos">Videos</router-link>
        </a>
      </li>
    </ul>
    <div class="container mx-auto">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">

</style>

