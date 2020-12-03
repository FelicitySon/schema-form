import { FiledPropsDefine } from '../types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      props.onChange(target.value);
    };
    return () => {
      const { value } = props;

      return <input type="text" value={value} onInput={handleChange} />;
    };
  },
});
