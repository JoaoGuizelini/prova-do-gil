<script lang="ts">
  interface Props {
    name: string;
    avatar: string;
  }

  let { name, avatar }: Props = $props();
</script>

<div class="item">
  <div class="ring">
    <div class="ring-inner">
      <img src={avatar} alt={name} />
    </div>
  </div>
  <span>{name}</span>
</div>

<style>
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.15s ease;
  }

  .item:hover { transform: scale(1.06); }

  .ring {
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    padding: 2.5px;
    border-radius: 50%;
  }

  .ring-inner {
    background: white;
    border-radius: 50%;
    padding: 2px;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  span {
    font-size: 11px;
    color: #4b5563;
    font-weight: 500;
    max-width: 64px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
</style>