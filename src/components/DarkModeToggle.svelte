<script>
  import { onMount } from 'svelte';
  let darkMode = true;

  onMount(() => {
    let darkModeStored = localStorage.getItem('darkMode');
    if (darkModeStored === 'true') {
      document.querySelector('body').classList.add('dark');
      darkMode = true;
    } else if (darkModeStored === 'false') {
      document.querySelector('body').classList.remove('dark');
      darkMode = false;
    }
  });

  function toggleDarkMode() {
    const body = document.querySelector('body');
    body.classList.toggle('dark');
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
  }
</script>

<button
  class="hover:shadow-neu-light dark:hover:shadow-neu-dark flex text-gray-400 hover:text-gray-800 dark:duration-0 dark:text-gray-600 dark:hover:ring-1 ring-cyan-800 dark:hover:text-gray-500 justify-center items-center transition-all md:duration-500 ml-7 p-3 md:p-3 rounded-xl"
  on:click={toggleDarkMode}
>
  {#if darkMode}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 transition-none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 transition-none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  {/if}
</button>
