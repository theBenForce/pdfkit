const metadata = require("../lib/mixins/metadata");

const createThis = () => {
  var self = {
    _root: {
      data: {}
    }
  };

  self.write = jest.fn(data => {
    self.output = data;
  });

  self.end = jest.fn();

  self.ref = jest.fn(obj => {
    var methods = {
      write: self.write,
      end: self.end
    };
    return Object.assign({ data: obj }, methods);
  });

  return self;
};

describe("metadata mixin", () => {
  it("should add xml stream to document", () => {
    var self = createThis();

    metadata.setMetadata.call(self, {});

    expect(self._root.data.Metadata).toBeDefined();
    expect(self.output.length).toBeGreaterThan(0);
    expect(self.ref.mock.calls.length).toBe(1);
    expect(self.write.mock.calls.length).toBe(1);
    expect(self.end.mock.calls.length).toBe(1);
  });
});
