import { defineComponent, Ref, ref } from 'vue';
import { createUseStyles } from 'vue-jss';

import MonacoEditor from '@/components/MonacoEditor';

// eslint-disable-next-line
function toJson(data: any) {
  return JSON.stringify(data, null, 2);
}

const schema = {
  type: 'string',
};

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
});

const App = defineComponent({
  setup() {
    // eslint-disable-next-line
    const schemaRef: Ref<any> = ref(schema);

    const handleChange = (code: string) => {
      // eslint-disable-next-line
      let schema: any;
      try {
        schema = JSON.parse(code);
      } catch (error) {
        console.log(error);
      }
      schemaRef.value = schema;
    };

    const classRef = useStyles();

    return () => {
      const code = toJson(schemaRef.value);
      const classes = classRef.value;
      return (
        <>
          <MonacoEditor
            class={classes.editor}
            code={code}
            title="Test"
            onChange={handleChange}
          />
        </>
      );
    };
  },
});

export default App;
