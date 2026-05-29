<script lang="ts">
  import { onMount } from 'svelte';
  import StoriesItem from './StoriesItem.svelte';
  import { fetchUsers, type RandomUser } from '../api/user.service';
    import { random } from '../utils/random';

  // ── Reactive state ────────────────────────────────────────────────────────
  let users   = $state<RandomUser[]>([]);
  let loading = $state(true);
  let error   = $state<string | null>(null);

  // ── Fetch on mount ────────────────────────────────────────────────────────
  onMount(async () => {
    try {
      users = await fetchUsers(random(2,8));
    } catch (e) {
      error = e instanceof Error ? e.message : 'Erro ao carregar stories.';
    } finally {
      loading = false;
    }
  });
</script>

<section>
  <header>
    <h2>Stories</h2>
    <a href="#watch">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
      </svg>
      Watch all
    </a>
  </header>

  <div class="list">
    {#if loading}
      <!-- Skeleton placeholders -->
      {#each Array(7) as _}
        <div class="skeleton-item">
          <div class="skeleton-avatar"></div>
          <div class="skeleton-name"></div>
        </div>
      {/each}

    {:else if error}
      <p class="error">{error}</p>

    {:else}
      {#each users as user (user.login.username)}
        <StoriesItem
          name={user.name.first}
          avatar={user.picture.medium}
        />
      {/each}
    {/if}
  </div>
</section>

<style>
  section { margin-bottom: 2rem; }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  a {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.15s;
  }

  a:hover { color: #6b7280; }
  a svg   { width: 15px; height: 15px; }

  .list {
    display: flex;
    gap: 1.25rem;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .list::-webkit-scrollbar       { height: 3px; }
  .list::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 999px; }

  /* ── Skeleton ── */
  .skeleton-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .skeleton-avatar {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }

  .skeleton-name {
    width: 48px;
    height: 10px;
    border-radius: 6px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .error { color: #ef4444; font-size: 0.8rem; }
</style>