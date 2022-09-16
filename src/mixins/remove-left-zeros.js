export default {
  methods: {
    removeLeftZeros(drenagem) {
      let temZeroAEsquerda = drenagem.substring(1, 0) === '0'
      while (temZeroAEsquerda) {
        if(temZeroAEsquerda) drenagem = drenagem.substring(1, drenagem)
        temZeroAEsquerda = drenagem.substring(1, 0) === '0'
      }
      return drenagem
    }
  }
}
