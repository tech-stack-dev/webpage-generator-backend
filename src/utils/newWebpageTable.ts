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
      name: 'slug',
      type: 'singleLineText',
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
      name: 'heroTitle',
      type: 'singleLineText',
    },
    {
      name: 'heroContent',
      type: 'multilineText',
    },
    {
      name: 'mainContent',
      type: 'multilineText',
    },
    {
      name: 'status',
      type: 'checkbox',
      options: {
        color: 'greenBright',
        icon: 'check',
      },
    },
  ],
};
