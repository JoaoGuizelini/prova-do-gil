<script lang="ts">
  import { onMount } from 'svelte';
  import FeedItem from './FeedItem.svelte';
  import { fetchRandomPhotos, sizedUrl, type PicsumPhoto } from '../api/phto.service';
  import { fetchUsers, type RandomUser } from '../api/user.service';
    import { URL_PHOTO } from '../api/urls';

  let photos     = $state<PicsumPhoto[]>([]);
  let users      = $state<RandomUser[]>([]);
  let loading    = $state(true);
  let refreshing = $state(false);
  let error      = $state<string | null>(null);
  let activeTab  = $state<'latest' | 'popular'>('latest');

  let feedItems = $derived(
    photos.map((photo, i) => {
      const user = users[i % (users.length || 1)];
      const seed = parseInt(photo.id, 10);
      return {
        id:         photo.id,
        imageUrl:   sizedUrl(photo.id, 600, 400),
        userName:   user ? user.name.first : photo.author.split(' ')[0],
        userAvatar: user?.picture.medium ?? URL_PHOTO + `seed/${photo.id}/50/50`,
        likes:      (seed * 7)  % 490 + 10,
        comments:   (seed * 13) % 390 + 5,
      };
    })
  );

  let displayed = $derived(
    activeTab === 'latest'
      ? [...feedItems].sort((a, b) => parseInt(b.id) - parseInt(a.id))
      : [...feedItems].sort((a, b) => b.likes - a.likes)
  );

  async function loadFeed(isRefresh = false) {
    if (isRefresh) refreshing = true;
    else loading = true;
    error = null;

    try {
      [photos, users] = await Promise.all([
        fetchRandomPhotos(4),
        fetchUsers(4),
      ]);
    } catch (e) {
      error = e instanceof Error ? e.message : 'Erro ao carregar o feed.';
    } finally {
      loading    = false;
      refreshing = false;
    }
  }

  onMount(() => loadFeed());
</script>

<section>
  <header>
    <h2>Feed</h2>
    <div class="header-right">
      <nav>
        <button
          class:active={activeTab === 'latest'}
          onclick={() => (activeTab = 'latest')}
        >
          Latest
        </button>
        <button
          class:active={activeTab === 'popular'}
          onclick={() => (activeTab = 'popular')}
        >
          Popular
        </button>
      </nav>
    </div>
  </header>

  {#if error}
    <p class="error">{error}</p>

  {:else if loading}
    <div class="grid">
      {#each Array(4) as _}
        <div class="skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-footer">
            <div class="skeleton-circle"></div>
            <div class="skeleton-line"></div>
          </div>
        </div>
      {/each}
    </div>

  {:else}
    <div class="grid" class:fading={refreshing}>
      {#each displayed as item (item.id)}
        <FeedItem
          imageUrl={item.imageUrl}
          userName={item.userName}
          userAvatar={item.userAvatar}
          likes={item.likes}
          comments={item.comments}
        />
      {/each}
    </div>
  {/if}
</section>

<style>
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

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  nav { display: flex; gap: 1rem; }

  button {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    font-family: inherit;
  }

  button.active {
    font-weight: 700;
    color: #111827;
    border-bottom-color: #111827;
  }

  button:not(.active):not(.refresh):hover { color: #6b7280; }

  /* ── Refresh button ── */
  .refresh {
    border-bottom: none;
    padding: 6px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    transition: background 0.15s, color 0.15s, transform 0.15s;
  }

  .refresh:hover:not(:disabled) {
    background: #f3f4f6;
    color: #e1306c;
  }

  .refresh:disabled { opacity: 0.4; cursor: default; }

  .refresh svg { width: 16px; height: 16px; }

  .refresh.spinning svg {
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Grid ── */
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    transition: opacity 0.2s ease;
  }

  .grid.fading { opacity: 0.4; }

  /* ── Skeleton ── */
  .skeleton-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }

  .skeleton-image {
    height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }

  .skeleton-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
  }

  .skeleton-circle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    flex-shrink: 0;
  }

  .skeleton-line {
    width: 80px;
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