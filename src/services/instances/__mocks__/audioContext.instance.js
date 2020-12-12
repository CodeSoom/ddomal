const mockAnalyser = {
  getByteFrequencyData: () => {},
};

const context = {
  createAnalyser: () => mockAnalyser,
  resume: () => {},
};

export default context;
