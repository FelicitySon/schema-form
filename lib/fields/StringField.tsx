import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StringField',
  // eslint-disable-next-line
  setup(props, { slots, emit, attrs }) {
    return () => {
      return <div>hello StringField</div>;
    };
  },
});
