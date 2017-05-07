import freeze from 'deep-freeze-node';
import keys from '../../app/client/MusicApplication/reducers/keys';

describe('MUSIC_APP_KEY_ACTIVATE', ()=>{
  it('will return an object with active equal to true', () => {
    const dataBefore = freeze([
      {
        active: false,
        keyCode: 192,
        key: '`',
        steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        playbackRate: 1,
        buffer: undefined
      }
    ]);
    const dataAfter = [
      {
        active: true,
        keyCode: 192,
        key: '`',
        steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        playbackRate: 1,
        buffer: undefined
      }
    ];
    expect(keys(dataBefore, { type: 'MUSIC_APP_KEY_ACTIVATE', data: { keyCode: 192 } })).to.deep.equal(dataAfter);
  });
});

