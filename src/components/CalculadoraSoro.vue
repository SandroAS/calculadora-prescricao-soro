<template>
  <v-container fill-height>
    <v-layout justify-center>

      <v-flex xs12 sm8 md7 lg6 xl3>

        <h1 class="text-center">Calculadora para Prescrição de Soro</h1>
        <h3 class="text-center">Distúrbio Hidroeletrolítico</h3>

        <v-card elevation="12" class="mt-5">
          <v-img
            src="https://guiadafarmacia.com.br/wp-content/uploads/2019/03/prescricao-terapeutica-digital.jpg"
          ></v-img>

          <v-toolbar color="primary" dark>
            <v-toolbar-title>Preencha os dados do paciente</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular
              v-show="false"
              indeterminate
              color="white"
              width="2"
            ></v-progress-circular>
          </v-toolbar>

          <v-card-text>
            <validation-observer
              ref="observer"
              v-slot="{ invalid }"
            >
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="submit"
              >
                <h2>Dados</h2>

                <validation-provider
                  v-slot="{ errors }"
                  name="Peso"
                  rules="required|double"
                >
                  <v-text-field
                    v-model="kg"
                    :error-messages="errors"
                    label="Peso"
                    required
                    suffix="Kg"
                    v-mask="['##.###', '###.###']"
                  ></v-text-field>
                </validation-provider>

                <h2>Ganhos</h2>

                <validation-provider
                  v-slot="{ errors }"
                  name="Quantidade de soro"
                  rules="required|numeric"
                >
                  <v-text-field
                    v-model="soroGanho"
                    :error-messages="errors"
                    label="Quantidade de soro"
                    required
                    suffix="ml"
                  ></v-text-field>
                </validation-provider>

                <v-text-field
                  value="400"
                  label="Quantidade de água endógena"
                  required
                  suffix="ml"
                  disabled
                ></v-text-field>

                <h2>Perdas</h2>

                <validation-provider
                  v-slot="{ errors }"
                  name="Soma de eletrolitos perdidos"
                  rules="required|numeric"
                >
                  <v-text-field
                    v-model="somaEletrolitosPerdidos"
                    :error-messages="errors"
                    label="Soma de eletrolitos perdidos"
                    required
                    suffix="ml"
                    messages="Olhar sondas e drenos"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="Diurese"
                  rules="required|numeric"
                >
                  <v-text-field
                    v-model="diurese"
                    :error-messages="errors"
                    label="Diurese"
                    required
                    suffix="ml"
                  ></v-text-field>
                </validation-provider>

                <v-row>
                  <v-col col="12" sm="12" md="6">
                    <v-text-field
                      v-model="insensiveis"
                      label="Insensíveis"
                      required
                      suffix="ml"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col col="12" sm="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Temperatura do dia"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="temperaturaDoDia"
                        class="mt-0 pt-0"
                        :error-messages="errors"
                        label="Temperatura do dia"
                        required
                        suffix="°C"
                        single-line
                        type="number"
                        style="width: 60px; padding-top: 16px !important;"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-btn
                    type="submit"
                    :disabled="invalid"
                    color="primary"
                  >
                    Calcular
                  </v-btn>
                </v-card-actions>

              </v-form>
            </validation-observer>
          </v-card-text>

        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'CalculadoraSoro',
  data: () => ({
    valid: true,
    kg: '',
    soroGanho: '',
    somaEletrolitosPerdidos: '',
    diurese: '',
    insensiveis: 1000,
    temperaturaDoDia: 29
  }),
  watch: {
    temperaturaDoDia() {
      if(this.temperaturaDoDia > 29) {
        this.insensiveis = 1000 + ((this.temperaturaDoDia - 29) * 500)
      }
    }
  },
  methods: {
    submit () {
      this.$refs.observer.validate()
    }
  }
}
</script>
