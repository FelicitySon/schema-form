import { defineComponent } from 'vue';
import { FiledPropsDefine } from './types';
import SchemaItem from './SchemaItem';

export default defineComponent({
  name: 'SchemaForm',
  props: FiledPropsDefine,
  // eslint-disable-next-line
  setup(props, { slots, emit, attrs }) {
    return () => {
      const { schema, value, onChange } = props;
      const handleChange = (v: any) => {
        onChange(v);
      };

      return (
        <SchemaItem schema={schema} value={value} onChange={handleChange} />
      );
    };
  },
});
