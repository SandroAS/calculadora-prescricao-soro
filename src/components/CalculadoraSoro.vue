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
                <validation-provider
                  v-slot="{ errors }"
                  name="Kg"
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

                <v-btn
                  type="submit"
                  :disabled="invalid"
                  color="primary"
                >
                  submit
                </v-btn>

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
    kg: ''
  }),
  methods: {
    submit () {
      this.$refs.observer.validate()
    }
  }
}
</script>
