import { ICreateTable } from 'src/types/airtable';

export const newWebpageTable: ICreateTable = {
  name: '',
  description: 'Table for generated webpages',
  fields: [
    {
      name: 'geo',
      type: 'singleLineText',
    },
    {
      name: 'mainContent',
      type: 'multilineText',
    },
    {
      name: 'metaTitle',
      type: 'singleLineText',
    },
    {
      name: 'metaDescription',
      type: 'multilineText',
    },
    {
      name: 'slug',
      type: 'singleLineText',
    },
    {
      name: 'heroTitle',
      type: 'singleLineText',
    },
    {
      name: 'heroContent',
      type: 'multilineText',
    },
  ],
};
