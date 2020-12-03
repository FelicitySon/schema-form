import { PropType } from 'vue';

export type SchemaTypes =
  | 'number'
  | 'integer'
  | 'string'
  | 'object'
  | 'array'
  | 'boolean';

export interface Schema {
  type: SchemaTypes;
}

export const FiledPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    type: Object as PropType<string | number | string[] | undefined>,
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const;
