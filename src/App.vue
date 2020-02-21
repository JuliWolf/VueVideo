<template>
  <div id="app">
    <ul class="flex">
      <li class="mr-3">
        <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white">
          <router-link to="/videos">Videos</router-link>
        </a>
      </li>
    </ul>
    <div class="container mx-auto">
      <router-view/>
    </div>
  </div>
</template>


