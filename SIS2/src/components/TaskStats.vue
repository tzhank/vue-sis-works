<template>
  <BaseCard>
    <template #header>Statistics</template>
    Total: <b>{{ total }}</b> |
    Active: <b>{{ active }}</b> |
    Completed: <b>{{ completed }}</b>
  </BaseCard>
</template>

<script>
export default {
  props: {
    total: Number,
    active: Number,
    completed: Number
  }
}
</script>