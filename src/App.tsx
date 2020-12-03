import { defineComponent, reactive, Ref, ref, watchEffect } from 'vue';
import { createUseStyles } from 'vue-jss';

import MonacoEditor from '@/components/MonacoEditor';
import SchemaForm from './../lib';

import demos from '@/demos';

// TODO: 在lib中export
type Schema = any;
type UISchema = any;

function toJson(data: any) {
  return JSON.stringify(data, null, 2);
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1400px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  code: {
    width: 800,
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '48%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
});

const App = defineComponent({
  setup() {
    const methodRef: Ref<any> = ref();
    const classesRef = useStyles();
    const selectedRef: Ref<number> = ref(0);
    const demo: {
      schema: Schema | null;
      data: any;
      uiSchema: UISchema | null;
      schemaCode: string;
      dataCode: string;
      uiSchemaCode: string;
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
    });

    watchEffect(() => {
      const index = selectedRef.value;
      const d = demos[index];
      demo.schema = d.schema;
      demo.data = d.default;
      demo.uiSchema = d.uiSchema;
      demo.schemaCode = toJson(d.schema);
      demo.dataCode = toJson(d.default);
      demo.uiSchemaCode = toJson(d.uiSchema);
    });

    const handleChange = (v: any) => {
      demo.data = v;
      demo.dataCode = toJson(v);
    };

    const handleCodeChange = (
      filed: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) => {
      try {
        const json = JSON.parse(value);
        demo[filed] = json;
        (demo as any)[`${filed}Code`] = value;
      } catch (error) {
        console.log(error);
      }
    };

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v);
    const handleDataChange = (v: string) => handleCodeChange('data', v);
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v);

    return () => {
      const selected = selectedRef.value;
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                class={classes.codePanel}
                onChange={handleSchemaChange}
                title="Schema"
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  class={classes.codePanel}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                />
                <MonacoEditor
                  code={demo.dataCode}
                  class={classes.codePanel}
                  onChange={handleDataChange}
                  title="Value"
                />
              </div>
            </div>
            <div class={classes.form}>
              <SchemaForm
                schema={demo.schema}
                value={demo.data}
                onChange={handleChange}
              />
              {/* <SchemaForm
                schema={demo.schema!}
                uiSchema={demo.uiSchema!}
                onChange={handleChange}
                contextRef={methodRef}
                value={demo.data}
              /> */}
            </div>
          </div>
        </div>
      );
    };
  },
});

export default App;
