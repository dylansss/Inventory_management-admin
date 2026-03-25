<template>
  <footer class="filing-footer">
    <a
      class="filing-link"
      href="https://beian.miit.gov.cn"
      target="_blank"
      rel="noopener noreferrer"
    >
      ICP备案/许可证号：豫ICP备2026008239号-2
    </a>
  </footer>
</template>

<style scoped lang="scss">
.filing-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  text-align: center;
}

.filing-link {
  color: inherit;
  font-size: 14px;
  line-height: 1.5;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
}
</style>
