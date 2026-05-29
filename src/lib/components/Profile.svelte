<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchLoggedUser, type RandomUser } from '../api/user.service';
    import { random } from '../utils/random';

  // ── Reactive state ────────────────────────────────────────────────────────
  let user    = $state<RandomUser | null>(null);
  let loading = $state(true);
  let error   = $state<string | null>(null);

  // ── Deterministic stats from user seed ───────────────────────────────────
  let stats = $derived(
    user
      ? {
          posts:     user.dob.age * random(1,10),
          followers: `${user.dob.age * random(4,200)}`,
          following: `${user.dob.age * random(4,20)}`,
        }
      : { posts: 0, followers: '0', following: '0' }
  );

  // ── Fetch on mount ────────────────────────────────────────────────────────
  onMount(async () => {
    try {
      user = await fetchLoggedUser();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Erro ao carregar perfil.';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <!-- Skeleton -->
  <div class="skeleton-profile">
    <div class="skeleton-avatar"></div>
    <div class="skeleton-line wide"></div>
    <div class="skeleton-line narrow"></div>
  </div>

{:else if error}
  <p class="error">{error}</p>

{:else if user}
  <div class="profile">
    <div class="ring">
      <div class="ring-inner">
        <img src={user.picture.large} alt="{user.name.first} {user.name.last}" />
      </div>
    </div>
    <p class="name">{user.name.first} {user.name.last}</p>
    <p class="handle">@{user.login.username}</p>
  </div>

  <div class="stats">
    <div class="stat">
      <span class="val">{stats.posts}</span>
      <span class="lbl">Posts</span>
    </div>
    <div class="stat mid">
      <span class="val">{stats.followers}</span>
      <span class="lbl">Followers</span>
    </div>
    <div class="stat">
      <span class="val">{stats.following}</span>
      <span class="lbl">Following</span>
    </div>
  </div>
{/if}

<style>
  /* ── Profile block ── */
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .ring {
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    padding: 2.5px;
    border-radius: 50%;
    margin-bottom: 0.75rem;
  }

  .ring-inner {
    background: white;
    border-radius: 50%;
    padding: 3px;
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  .name {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  .handle {
    font-size: 0.75rem;
    color: #9ca3af;
    margin: 2px 0 0;
  }

  /* ── Stats bar ── */
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #f3f4f6;
    border-bottom: 1px solid #f3f4f6;
    padding: 0.75rem 0;
    margin-bottom: 1.25rem;
    text-align: center;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mid {
    border-left: 1px solid #f3f4f6;
    border-right: 1px solid #f3f4f6;
  }

  .val {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
  }

  .lbl {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9ca3af;
    margin-top: 2px;
  }

  /* ── Skeleton ── */
  .skeleton-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 1.25rem;
  }

  .skeleton-avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }

  .skeleton-line {
    height: 10px;
    border-radius: 6px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }

  .wide   { width: 90px; }
  .narrow { width: 60px; }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .error { color: #ef4444; font-size: 0.8rem; }
</style>