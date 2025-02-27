import translate from 'translate';

// Configuração da tradução


translate.engine = 'google';

export const translateText = async (text: string) => {
  try {
    const traducao = await translate(text, { from: 'en', to: 'pt' });
    return traducao;
  } catch (error) {
    console.error('Erro ao traduzir:', text);
    return text;
  }
}
