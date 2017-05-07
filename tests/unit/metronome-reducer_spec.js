import freeze from 'deep-freeze-node';
import metronome from '../../app/client/MusicApplication/reducers/metronome';

describe('METRONOME_STOP', ()=>{
  it('will return an object with isPlaying equal to false', () => {
    const dataBefore = freeze({ isPlaying: true });
    const dataAfter = { isPlaying: false };
    expect(metronome(dataBefore, { type: 'METRONOME_STOP' })).to.deep.equal(dataAfter);
  });
});

describe('METRONOME_PLAY', ()=>{
  it('will return an object with isPlaying equal to true', () => {
    const dataBefore = freeze({ isPlaying: false });
    const dataAfter = { isPlaying: true };
    expect(metronome(dataBefore, { type: 'METRONOME_PLAY' })).to.deep.equal(dataAfter);
  });
});
