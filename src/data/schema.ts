import { absoluteUrl, schemaId, site, type SchemaNode } from '../config/site';

export const organizationSchema: SchemaNode = {
  '@type': 'Organization',
  '@id': schemaId('organization'),
  name: site.name,
  url: site.origin,
  email: site.email,
  telephone: site.telephone,
};

export const websiteSchema: SchemaNode = {
  '@type': 'WebSite',
  '@id': schemaId('website'),
  name: site.name,
  url: site.origin,
  publisher: { '@id': schemaId('organization') },
};

export const joySchema: SchemaNode = {
  '@type': 'Person',
  '@id': `${absoluteUrl('/about')}#joy`,
  name: 'Joy Blundell',
  worksFor: { '@id': schemaId('organization') },
  jobTitle: 'Life and Leadership Coach',
};

export const paulSchema: SchemaNode = {
  '@type': 'Person',
  '@id': `${absoluteUrl('/about')}#paul`,
  name: 'Paul Blundell',
  worksFor: { '@id': schemaId('organization') },
};

export function serviceSchema(name: string, path: string, description: string): SchemaNode {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': schemaId('organization') },
  };
}

export function pageSchema(type: 'AboutPage' | 'ContactPage', path: string, name: string): SchemaNode {
  return {
    '@type': type,
    '@id': `${absoluteUrl(path)}#page`,
    name,
    url: absoluteUrl(path),
    isPartOf: { '@id': schemaId('website') },
    about: { '@id': schemaId('organization') },
  };
}

export function coachingCollectionSchema(): SchemaNode {
  const path = '/coaching';

  return {
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(path)}#page`,
    name: 'Coaching with Threads Coaching',
    description:
      'Explore life and leadership, identity and faith, and personality coaching with Threads Coaching.',
    url: absoluteUrl(path),
    isPartOf: { '@id': schemaId('website') },
    about: { '@id': schemaId('organization') },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: { '@id': `${absoluteUrl('/one-to-one-sessions')}#service` },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: { '@id': `${absoluteUrl('/body-soul-spirit-reset')}#service` },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: { '@id': `${absoluteUrl('/personality-discover-develop')}#service` },
        },
      ],
    },
  };
}
