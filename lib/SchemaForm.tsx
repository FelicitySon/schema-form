import { defineComponent, PropType } from 'vue';

import { Schema } from './types';
import SchemaItem from './SchemaItem';

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
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
