<template>
  <v-container fill-height>
    <v-layout justify-center>

      <v-flex xs12 sm8 md7 lg6 xl3>

        <h1 class="text-center mt-5">Calculadora para Prescrição de Soroterapia</h1>

        <v-card elevation="12" class="mt-5">
          <!-- Preencha os dados do paciente -->
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
          <!-- Formulário -->
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
                <h2>Anamnese</h2>
                <!-- Kg -->
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

                <h5>Qual momento operatório?</h5>
                <!-- Checkbox Pós Operatório Imediato -->
                <v-checkbox
                  v-model="temPosOperatorioImediato"
                  class="ma-0"
                >
                  <template v-slot:label>
                    <small>Pós operatório imediato</small>
                  </template>
                </v-checkbox>
                <!-- Dia Pós Operatório -->
                <validation-provider
                  v-slot="{ errors }"
                  name="Dia pós operatório"
                  rules="required|numeric"
                >
                  <v-text-field
                    v-model="diaPosOperatorio"
                    :error-messages="errors"
                    label="Dia pós operatório"
                    required
                    type="number"
                    :disabled="temPosOperatorioImediato"
                  ></v-text-field>
                </validation-provider>

                <!-- Formulário de Ganhos e Perdas -->
                <template v-if="!temPosOperatorioImediato">
                  <h2>Ganhos</h2>
                  <!-- Soro Ganho -->
                  <validation-provider
                    v-slot="{ errors }"
                    name="Quantidade de soroterapia"
                    rules="required|numeric"
                  >
                    <v-text-field
                      v-model="soroGanho"
                      :error-messages="errors"
                      label="Quantidade de soroterapia"
                      required
                      suffix="ml"
                    ></v-text-field>
                  </validation-provider>
                  <!-- Líquido ingerido -->
                  <validation-provider
                    v-slot="{ errors }"
                    name="Quantidade de líquido ingerido"
                    rules="required|numeric"
                  >
                    <v-text-field
                      v-model="liquidoIngerido"
                      :error-messages="errors"
                      label="Quantidade de líquido ingerido"
                      required
                      suffix="ml"
                    ></v-text-field>
                  </validation-provider>
                  <!-- Outros -->
                  <validation-provider
                    v-slot="{ errors }"
                    name="Outros"
                    rules="required|numeric"
                  >
                    <v-text-field
                      v-model="outros"
                      :error-messages="errors"
                      label="Outros"
                      required
                      suffix="ml"
                    ></v-text-field>
                  </validation-provider>
                  <!-- Quantidade de água endógena -->
                  <v-text-field
                    value="400"
                    label="Quantidade de água endógena"
                    required
                    suffix="ml"
                    disabled
                  ></v-text-field>

                  <h2 class="mb-5">Perdas</h2>
                  <!-- Drenagens -->
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-row>
                        <!-- Checkbox Drenagem Serossanguínea -->
                        <v-col sm="6" md="6">
                          <v-checkbox
                            v-model="houveDrenagemSerossanguinea"
                            class="ma-0"
                          >
                            <template v-slot:label>
                              <small>Drenagem serossanguínea</small>
                            </template>
                          </v-checkbox>
                        </v-col>
                        <!-- Input Drenagem Serossanguínea -->
                        <v-col sm="6" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Quantidade de dreno serossanguíneo"
                            rules="required|numeric"
                          >
                            <v-text-field
                              v-model="drenagemSerossanguinea"
                              :error-messages="errors"
                              label="Quantidade de dreno serossanguíneo"
                              required
                              suffix="ml"
                              :disabled="!houveDrenagemSerossanguinea"
                              @blur="removeLeftZero('serossanguineo')"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-row>
                        <!-- Checkbox Drenagem Gástrica -->
                        <v-col sm="6" md="6">
                          <v-checkbox
                            v-model="houveDrenagemGastrica"
                            class="ma-0"
                          >
                            <template v-slot:label>
                              <small>Drenagem gástrica</small>
                            </template>
                          </v-checkbox>
                        </v-col>
                        <!-- Input Drenagem Gástrica -->
                        <v-col sm="6" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Quantidade de dreno gástrico"
                            rules="required|numeric"
                          >
                            <v-text-field
                              v-model="drenagemGastrica"
                              :error-messages="errors"
                              label="Quantidade de dreno gástrico"
                              required
                              suffix="ml"
                              :disabled="!houveDrenagemGastrica"
                              @blur="removeLeftZero('gastrico')"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-row>
                        <!-- Checkbox Drenagem Duodenal -->
                        <v-col sm="6" md="6">
                          <v-checkbox
                            v-model="houveDrenagemDuodenal"
                            class="ma-0"
                          >
                            <template v-slot:label>
                              <small>Drenagem duodenal</small>
                            </template>
                          </v-checkbox>
                        </v-col>
                        <!-- Input Drenagem Duodenal -->
                        <v-col sm="6" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Quantidade de dreno duodenal"
                            rules="required|numeric"
                          >
                            <v-text-field
                              v-model="drenagemDuodenal"
                              :error-messages="errors"
                              label="Quantidade de dreno duodenal"
                              required
                              suffix="ml"
                              :disabled="!houveDrenagemDuodenal"
                              @blur="removeLeftZero('duodenal')"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-row>
                        <!-- Checkbox Drenagem Bile -->
                        <v-col sm="6" md="6">
                          <v-checkbox
                            v-model="houveDrenagemBile"
                            class="ma-0"
                          >
                            <template v-slot:label>
                              <small>Drenagem bile</small>
                            </template>
                          </v-checkbox>
                        </v-col>
                        <!-- Input Drenagem Bile -->
                        <v-col sm="6" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Quantidade de dreno bile"
                            rules="required|numeric"
                          >
                            <v-text-field
                              v-model="drenagemBile"
                              :error-messages="errors"
                              label="Quantidade de dreno bile"
                              required
                              suffix="ml"
                              :disabled="!houveDrenagemBile"
                              @blur="removeLeftZero('bile')"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-row>
                        <!-- Checkbox Drenagem Ileal -->
                        <v-col sm="6" md="6">
                          <v-checkbox
                            v-model="houveDrenagemIleal"
                            class="ma-0"
                          >
                            <template v-slot:label>
                              <small>Drenagem ileal</small>
                            </template>
                          </v-checkbox>
                        </v-col>
                        <!-- Input Drenagem Ileal -->
                        <v-col sm="6" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Quantidade de dreno ileal"
                            rules="required|numeric"
                          >
                            <v-text-field
                              v-model="drenagemIleal"
                              :error-messages="errors"
                              label="Quantidade de dreno ileal"
                              required
                              suffix="ml"
                              :disabled="!houveDrenagemIleal"
                              @blur="removeLeftZero('ileal')"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-row>
                        <!-- Checkbox Drenagem Cólica -->
                        <v-col sm="6" md="6">
                          <v-checkbox
                            v-model="houveDrenagemColica"
                            class="ma-0"
                          >
                            <template v-slot:label>
                              <small>Drenagem colica</small>
                            </template>
                          </v-checkbox>
                        </v-col>
                        <!-- Input Drenagem Cólica -->
                        <v-col sm="6" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Quantidade de dreno colica"
                            rules="required|numeric"
                          >
                            <v-text-field
                              v-model="drenagemColica"
                              :error-messages="errors"
                              label="Quantidade de dreno colica"
                              required
                              suffix="ml"
                              :disabled="!houveDrenagemColica"
                              @blur="removeLeftZero('colica')"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- Eletrolitos Perdidos -->
                  <v-row class="mb-3">
                    <!-- Sódio -->
                    <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                      <h3>Sódio</h3>
                      <v-divider class="mx-3"></v-divider>
                      <span>{{ ganhos }}</span>
                    </v-col>
                    <!-- Potássio -->
                    <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                      <h3>Potássio</h3>
                      <v-divider class="mx-3"></v-divider>
                      <span>{{ ganhos }}</span>
                    </v-col>
                    <!-- Cloreto -->
                    <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                      <h3>Cloreto</h3>
                      <v-divider class="mx-3"></v-divider>
                      <span>{{ ganhos }}</span>
                    </v-col>
                    <!-- Bicarbonato -->
                    <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                      <h3>Bicarbonato</h3>
                      <v-divider class="mx-3"></v-divider>
                      <span>{{ ganhos }}</span>
                    </v-col>
                  </v-row>

                  <!-- Diurese -->
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
                  <!-- Insensíveis -->
                  <v-row>
                    <!-- Insensíveis Temperatura do Dia -->
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
                    <!-- Temperatura do Dia -->
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
                    <!-- Insensíveis Febre -->
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
                    <!-- Possui Febre -->
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
                    <!-- Febre -->
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
                    <!-- Insensíveis Taquipneia -->
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
                    <!-- Taquipneia -->
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
                  <!-- Insensíveis Total -->
                  <v-text-field
                    v-model="insensiveis"
                    label="Insensíveis"
                    required
                    suffix="ml"
                    prefix="="
                    disabled
                  ></v-text-field>

                  <h2 class="mb-5">Balanço Hídrico</h2>
                  <v-row class="mb-3">
                    <!-- Ganhos -->
                    <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                      <h3>Ganhos</h3>
                      <h3>-</h3>
                    </v-col>
                    <!-- Perdas -->
                    <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                      <h3>Perdas</h3>
                      <h3>=</h3>
                    </v-col>
                    <!-- Total -->
                    <v-col cols="12" sm="4" md="4" class="d-flex justify-center">
                      <h3>Total</h3>
                    </v-col>
                    <!-- Ganhos Valores -->
                    <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                      <span>{{ ganhos }}</span>
                      <h3>-</h3>
                    </v-col>
                    <!-- Perdas Valores -->
                    <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                      <span>{{ perdas }}</span>
                      <h3>=</h3>
                    </v-col>
                    <!-- Total Valores -->
                    <v-col cols="12" sm="4" md="4" class="d-flex justify-center">
                      <span>{{ ganhos - perdas }}</span>
                    </v-col>
                  </v-row>
                </template>

                <h2 class="mb-5">Cálculo NBD</h2>
                <v-row class="mb-3">
                  <!-- Água -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                    <h3>Água</h3>
                    <v-divider class="mx-3"></v-divider>
                    <span>{{ kg * 30 }} - {{ kg * 40 }} ml</span>
                  </v-col>
                  <!-- Sódio -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                    <h3>Sódio</h3>
                    <v-divider class="mx-3"></v-divider>
                    <span>{{ kg * 1.0 }} - {{ kg * 1.5 }} mEq</span>
                  </v-col>
                  <!-- Potássio -->
                  <v-col v-if="!temPosOperatorioImediato" cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                    <h3>Potássio</h3>
                    <v-divider class="mx-3"></v-divider>
                    <span>{{ kg * 1 }} mEq</span>
                  </v-col>
                  <!-- Glicose -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                    <h3>Glicose</h3>
                    <v-divider class="mx-3"></v-divider>
                    <span>{{ 100 }} - {{ 150 }} mEq</span>
                  </v-col>
                </v-row>

                <h2 class="mb-5">Prescrição</h2>
                <v-row class="mb-3">
                  <!-- Ampola NaCl -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                    <h3>Ampolas NaCl 10%</h3>
                    <v-divider class="mx-3"></v-divider>
                    <span>{{ ((kg * 1.0) / 17.1).toFixed() }} - {{ ((kg * 1.5) / 17.1).toFixed() }}</span>
                  </v-col>
                  <!-- Ampola KCl -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                    <h3>Ampolas KCl 10%</h3>
                    <v-divider class="mx-3"></v-divider>
                    <span>{{ ((kg * 1.0) / 13.5).toFixed() }}</span>
                  </v-col>
                  <!-- Bolsas SG -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                    <h3>Bolsas 500 ml SG 50%</h3>
                    <v-divider class="mx-3"></v-divider>
                    <span>{{ ((kg * 30) / 500).toFixed() }} - {{ ((kg * 40) / 500).toFixed() }}</span>
                  </v-col>
                  <!-- Ou -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                    <h4>ou</h4>
                  </v-col>
                  <!-- Bolsas SF -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center pb-0">
                    <div>
                      <h3>Bolsas 500 ml SF 0,9%</h3>
                    </div>
                    <v-divider class="mx-3"></v-divider>
                    <span>{{ ((kg * 30) / 500).toFixed() }} - {{ ((kg * 40) / 500).toFixed() }}</span>
                  </v-col>
                  <!-- + SG -->
                  <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center pt-0">
                    <h3>SG 50%</h3>
                    <v-divider class="mx-3"></v-divider>
                    <span>+ mínimo 200 - 300 ml</span>
                  </v-col>
                </v-row>

                <v-divider class="mb-5"></v-divider>

                <h3 style="color: mediumvioletred;">Gotejamento: {{ (((kg * 30) / 500).toFixed()) * 7 }} - {{ (((kg * 40) / 500).toFixed() * 7) }} gotas/min (24h)</h3>

                <!-- Calcular -->
                <v-card-actions class="mt-5">
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
    temPosOperatorioImediato: true,
    diaPosOperatorio: 0,
    soroGanho: '',
    houveDrenagemSerossanguinea: false,
    houveDrenagemGastrica: false,
    houveDrenagemDuodenal: false,
    houveDrenagemBile: false,
    houveDrenagemSucoPancreatico: false,
    houveDrenagemIleal: false,
    houveDrenagemColica: false,
    drenagemSerossanguinea: '0',
    drenagemGastrica: '0',
    drenagemDuodenal: '0',
    drenagemBile: '0',
    drenagemSucoPancreatico: '0',
    drenagemIleal: '0',
    drenagemColica: '0',
    liquidoIngerido: '',
    outros: '',
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
      return parseInt(this.diurese) + parseInt(this.insensiveis)
    }
  },
  watch: {
    temperaturaDoDia(newTemperaturaDoDia) {
      if(newTemperaturaDoDia > 29) {
        if(Math.floor((newTemperaturaDoDia - 29).toFixed() / 3) >= 1) {
          this.insensiveisTemperaturaDoDia = (Math.floor((newTemperaturaDoDia - 29).toFixed() / 3) * 500) + 1000
        }
      } else this.insensiveisTemperaturaDoDia = 1000
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
    },
    houveDrenagemSerossanguinea(newHouveDrenagemSerossanguinea) {
      if(!newHouveDrenagemSerossanguinea) this.drenagemSerossanguinea = 0
    },
    houveDrenagemGastrica(newHouveDrenagemGastrica) {
      if(!newHouveDrenagemGastrica) this.drenagemGastrica = 0
    },
    houveDrenagemDuodenal(newHouveDrenagemDuodenal) {
      if(!newHouveDrenagemDuodenal) this.drenagemDuodenal = 0
    }
  },
  methods: {
    submit () {
      this.$refs.observer.validate()
    },
    removeLeftZero(dreno) {
      let temZeroAEsquerda = false
      switch (dreno) {
        case 'serossanguineo':
          temZeroAEsquerda = this.drenagemSerossanguinea.substring(1, 0) === '0'
          while (temZeroAEsquerda) {
            if(temZeroAEsquerda) {
              this.drenagemSerossanguinea = this.drenagemSerossanguinea.substring(1, this.drenagemSerossanguinea)
            }
            temZeroAEsquerda = this.drenagemSerossanguinea.substring(1, 0) === '0'
          }
          break
        case 'gastrico':
          temZeroAEsquerda = this.drenagemGastrica.substring(1, 0) === '0'
          while (temZeroAEsquerda) {
            if(temZeroAEsquerda) {
              this.drenagemGastrica = this.drenagemGastrica.substring(1, this.drenagemGastrica)
            }
            temZeroAEsquerda = this.drenagemGastrica.substring(1, 0) === '0'
          }
          break
        case 'duodenal':
          temZeroAEsquerda = this.drenagemDuodenal.substring(1, 0) === '0'
          while (temZeroAEsquerda) {
            if(temZeroAEsquerda) {
              this.drenagemDuodenal = this.drenagemDuodenal.substring(1, this.drenagemDuodenal)
            }
            temZeroAEsquerda = this.drenagemDuodenal.substring(1, 0) === '0'
          }
          break
      }
    }
  }
}
</script>
