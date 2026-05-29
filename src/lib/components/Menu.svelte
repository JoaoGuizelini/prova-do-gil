<script lang="ts">
  let active = $state('Feed');

  const items = [
    { label: 'Feed',          badge: null as number | null },
    { label: 'Explore',       badge: null },
    { label: 'Notifications', badge: 6   },
    { label: 'Messages',      badge: 29  },
  ];
</script>

<nav>
  {#each items as item}
    <a
      href="#"
      class="nav-item"
      class:is-active={active === item.label}
      onclick={(e) => { e.preventDefault(); active = item.label; }}
    >
      <!-- Feed -->
      {#if item.label === 'Feed'}
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="3"    y="3"    width="7.5" height="7.5" rx="1.5" />
          <rect x="13.5" y="3"    width="7.5" height="7.5" rx="1.5" />
          <rect x="3"    y="13.5" width="7.5" height="7.5" rx="1.5" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
        </svg>

      <!-- Explore -->
      {:else if item.label === 'Explore'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

      <!-- Notifications -->
      {:else if item.label === 'Notifications'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

      <!-- Messages -->
      {:else if item.label === 'Messages'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      {/if}

      <span class="label">{item.label}</span>

      {#if item.badge}
        <span class="badge">{item.badge}</span>
      {/if}
    </a>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    transition: background 0.15s, color 0.15s;
  }

  .nav-item:hover:not(.is-active) {
    background: #f9fafb;
    color: #374151;
  }

  .nav-item.is-active {
    background: #fff0f5;
    color: #e1306c;
    font-weight: 600;
  }

  .nav-item svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .label { flex: 1; }

  .badge {
    background: #e1306c;
    color: white;
    font-size: 10px;
    font-weight: 700;
    border-radius: 999px;
    padding: 1px 6px;
    min-width: 20px;
    text-align: center;
    line-height: 1.6;
  }
</style>