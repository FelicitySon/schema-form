export enum SchemaTypes {
  NUMBER = 'number',
  INTEGER = 'integer',
  STRING = 'string',
  OBJECT = 'object',
  ARRAY = 'array',
  BOOLEAN = 'boolean',
}

export interface Schema {
  type: SchemaTypes | string;
}
