import {when} from 'jest-when'
import {createNodeIntlMetadataRepository} from "./NodeIntlMetadataRepository";

describe('NodeIntlMetadataRepository tests', () => {
  describe('find tests', () => {
    test('should find metadata by node id', () => {
      const nodeId = 'a node id'
      const nodePluginData = {
        tag: "a tag",
        languages: '{"aLanguageCode": "a copy"}'
      }
      const getNodeById = jest.fn()
      when(getNodeById).calledWith(nodeId).mockReturnValue({
        id: nodeId,
        getPluginData: (key) => nodePluginData[key]
      })
      const repository = createNodeIntlMetadataRepository({getNodeById})

      const metadata = repository.find(nodeId)

      expect(metadata).toStrictEqual({nodeId, tag: "a tag", languages: {aLanguageCode: "a copy"}})
    })
  })
})
