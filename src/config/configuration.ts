export const CONFIG = {
  CARD_QRCODE_SECRET: 'CARD_QRCODE_SECRET',
};

export default () => ({
  CARD_QRCODE_SECRET: process.env[CONFIG.CARD_QRCODE_SECRET] || 'TEST_SECRET',
});
