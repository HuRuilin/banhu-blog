
<script lang="tsx">
import { ref, defineComponent } from "vue";
export default defineComponent({
  setup(props, ctx) {
    const copyright =ref(`蜀ICP备20021607号-1`) ;
    return () => {
      return (
        <div class="copyright-wrapper">
          <p class="copyright-content">{copyright.value}</p>
        </div>
      );
    };
  },
});
</script>
<style scoped lang="scss">
.copyright-content {
  line-height: 40px;
  letter-spacing: 2px;
  @include font(12px, #ccc, center);
}
</style>
