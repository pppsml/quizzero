import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: import.meta.env.VITE_BACKEND_URI_GRAPHQL,
  documents: 'src/**/*.{gql,graphql}',
  config: {
    withHooks: true,
    skipTypename: true,
    preResolveTypes: true,
  },
  generates: {
    'src/shared/api/models.gen.ts': {
      plugins: [
        'typescript',
      ],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.gen.ts',
        baseTypesPath: 'shared/api/models.gen.ts',
      },
      plugins: [
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}

export default config