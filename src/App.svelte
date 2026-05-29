<script lang="ts">
  import Profile from './lib/components/Profile.svelte';
  import Menu    from './lib/components/Menu.svelte';
  import Stories from './lib/components/Stories.svelte';
  import Feed    from './lib/components/Feed.svelte';
</script>

<div class="layout">

  <!-- ════ SIDEBAR ════ -->
  <aside class="sidebar">
    <div class="logo">Instagram</div>
    <Profile />
    <Menu />
  </aside>

  <!-- ════ MAIN ════ -->
  <main class="main">
    <Stories />
    <Feed />
  </main>

</div>

<style>
  :global(*) {
    box-sizing: border-box;
    font-family: 'Nunito', 'Segoe UI', system-ui, sans-serif;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background: #f3f4f6;
    overflow: hidden;
    height: 100vh;
  }

  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 210px;
    flex-shrink: 0;
    background: white;
    border-right: 1px solid #f3f4f6;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    overflow-y: auto;
  }

  .sidebar::-webkit-scrollbar       { width: 3px; }
  .sidebar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 999px; }

  .logo {
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    padding-left: 4px;
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-style: italic;
    letter-spacing: -0.5px;
  }

  /* ── Main ── */
  .main {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background: #f9fafb;
  }

  .main::-webkit-scrollbar       { width: 4px; }
  .main::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 999px; }
</style>