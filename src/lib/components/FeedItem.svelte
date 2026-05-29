<script lang="ts">
  interface Props {
    imageUrl:   string;
    userName:   string;
    userAvatar: string;
    likes:      number;
    comments:   number;
  }

  let { imageUrl, userName, userAvatar, likes, comments }: Props = $props();

  let liked        = $state(false);
  let currentLikes = $state(likes);

  function toggleLike() {
    liked        = !liked;
    currentLikes = liked ? currentLikes + 1 : currentLikes - 1;
  }
</script>

<article class="card">
  <div class="image-wrapper">
    <img src={imageUrl} alt="{userName}'s post" class="post-image" />
  </div>

  <footer>
    <div class="user">
      <img src={userAvatar} alt={userName} class="avatar" />
      <span class="username">{userName}</span>
    </div>

    <div class="actions">
      <button
        class="action like-btn"
        class:is-liked={liked}
        onclick={toggleLike}
        aria-label={liked ? 'Remover like' : 'Curtir'}
      >
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67
               l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06
               L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            fill={liked ? 'currentColor' : 'none'}
          />
        </svg>
        <span class="count">{currentLikes}</span>
      </button>

      <span class="action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span class="count">{comments}</span>
      </span>
    </div>
  </footer>
</article>

<style>
  .card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.10);
  }

  .image-wrapper {
    height: 200px;
    overflow: hidden;
    background: #f3f4f6;
  }

  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  .card:hover .post-image { transform: scale(1.06); }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  .username {
    font-size: 0.8rem;
    font-weight: 600;
    color: #1f2937;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ── Action base ── */
  .action {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    color: #9ca3af;
  }

  .action svg { width: 14px; height: 14px; }

  /* ── Like button ── */
  .like-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    transition: transform 0.15s ease, color 0.2s ease;
  }

  .like-btn:hover {
    transform: scale(1.2);
    color: #e1306c;
  }

  .like-btn.is-liked {
    color: #e1306c;
    animation: pop 0.25s ease;
  }

  .count { font-weight: 600; }

  @keyframes pop {
    0%   { transform: scale(1);    }
    50%  { transform: scale(1.35); }
    100% { transform: scale(1);    }
  }
</style>