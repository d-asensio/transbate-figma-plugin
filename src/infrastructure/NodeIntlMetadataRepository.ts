import {NodeIntlMetadata} from "../interfaces/NodeIntlMetadata"

type Dependencies = Pick<PluginAPI, "getNodeById">
type OptionalDependencies = Partial<Dependencies>

export const createNodeIntlMetadataRepository = (dependencies: OptionalDependencies = {}) => {

  const {getNodeById = figma.getNodeById} = dependencies

  function find(nodeId: string): NodeIntlMetadata {
    const node = getNodeById(nodeId)
    const tag = node.getPluginData("tag")
    const languages = node.getPluginData("languages")
    return {
      nodeId: node.id,
      tag,
      languages: JSON.parse(languages),
    }
  }

  function save(nodeId: string, metadata: NodeIntlMetadata) {

  }

  return {
    find,
    save
  }
}
