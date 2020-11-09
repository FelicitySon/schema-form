import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NumberField',
  // eslint-disable-next-line
  setup(props, { slots, emit, attrs }) {
    return () => {
      return <div>hello NumberField</div>;
    };
  },
});
