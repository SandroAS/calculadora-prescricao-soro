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
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="insensiveisTemperaturaDoDia"
                      label="Insensíveis"
                      required
                      suffix="ml"
                      prefix="+"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Temperatura do dia"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="temperaturaDoDia"
                        :error-messages="errors"
                        label="Temperatura do dia"
                        required
                        suffix="°C"
                        type="number"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="5" md="6">
                    <v-text-field
                      v-model="insensiveisFebre"
                      label="Insensíveis"
                      required
                      suffix="ml"
                      prefix="+"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="3">
                    <v-checkbox
                      v-model="possuiFebre"
                      class="ma-0"
                    >
                      <template v-slot:label>
                        <small>Possui febre?</small>
                      </template>
                    </v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Febre"
                      rules="required|double"
                    >
                      <v-text-field
                        v-model="febre"
                        :error-messages="errors"
                        label="Febre"
                        required
                        suffix="°C"
                        type="number"
                        min="37.2"
                        :disabled="!possuiFebre"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="insensiveisTaquipneia"
                      label="Insensíveis"
                      required
                      suffix="ml"
                      prefix="+"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Taquipneia"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="taquipneia"
                        :error-messages="errors"
                        label="Taquipneia"
                        required
                        suffix="irpm"
                        type="number"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="insensiveis"
                  label="Insensíveis"
                  required
                  suffix="ml"
                  prefix="="
                  disabled
                ></v-text-field>

                <h2 class="mb-5">Balanço Hídrico</h2>

                <v-row>
                  <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                    <h3>Ganhos</h3>
                    <h3>-</h3>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                    <h3>Perdas</h3>
                    <h3>=</h3>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" class="d-flex justify-center">
                    <h3>Total</h3>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                    <span>{{ ganhos }}</span>
                    <h3>-</h3>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                    <span>{{ perdas }}</span>
                    <h3>=</h3>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" class="d-flex justify-center">
                    <span>{{ ganhos - perdas }}</span>
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
    insensiveisTemperaturaDoDia: 1000,
    temperaturaDoDia: 29,
    insensiveisFebre: 0,
    possuiFebre: false,
    febre: 37.2,
    insensiveisTaquipneia: 0,
    taquipneia: 0
  }),
  computed: {
    insensiveis() {
      return this.insensiveisTemperaturaDoDia + this.insensiveisFebre + this.insensiveisTaquipneia
    },
    ganhos() {
      return this.soroGanho + 400
    },
    perdas() {
      return this.somaEletrolitosPerdidos + this.diurese + this.insensiveis
    }
  },
  watch: {
    temperaturaDoDia(newTemperaturaDoDia) {
      this.insensiveisTemperaturaDoDia = newTemperaturaDoDia > 29
        ? ((newTemperaturaDoDia - 29) * 500) + 1000
        : 1000
    },
    possuiFebre(newPossuiFebre) {
      if(!newPossuiFebre) {
        this.insensiveisFebre = 0
        this.febre = 37.2
      }
    },
    febre(newFebre) {
      this.insensiveisFebre = newFebre > 37.2 && newFebre - 37.2 >= 1
        ? Math.trunc((newFebre - 37.2)) * 100
        : 0
    },
    taquipneia(newTaquipneia) {
      this.insensiveisTaquipneia = newTaquipneia > 35 ? 1000 : 0
    }
  },
  methods: {
    submit () {
      this.$refs.observer.validate()
    }
  }
}
</script>
