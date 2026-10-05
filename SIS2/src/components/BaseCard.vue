<template>
  <div class="card">
    <h3 v-if="$slots.header"><slot name="header"></slot></h3>
    <slot></slot>
    <div v-if="$slots.footer" class="card-footer"><slot name="footer"></slot></div>
  </div>
</template>

<style>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}
.card-footer {
  color: #666;
  font-size: 13px;
}
</style>