import { defineComponent } from 'vue';
import NumberField from './fields/NumberField';
import StringField from './fields/StringField';
import { FiledPropsDefine } from './types';

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props) {
    return () => {
      let Component: any;

      const { schema } = props;
      // TODO: 如果type没有指定 我们需要猜测类型
      const type = schema.type;

      switch (type) {
        case 'string': {
          Component = StringField;
          break;
        }
        case 'number': {
          Component = NumberField;
          break;
        }
        default:
          console.warn(`${type} is not supported!`);
          break;
      }
      return <Component {...props} />;
    };
  },
});
