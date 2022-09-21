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
                <transition name="slide">
                  <div v-if="!temPosOperatorioImediato">
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
                        class="mb-5"
                        @blur="diaPosOperatorio = removeLeftZeros(diaPosOperatorio)"
                      ></v-text-field>
                    </validation-provider>

                    <!-- Formulário de Ganhos e Perdas -->
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
                        @blur="soroGanho = removeLeftZeros(soroGanho)"
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
                        @blur="liquidoIngerido = removeLeftZeros(liquidoIngerido)"
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
                        @blur="outros = removeLeftZeros(outros)"
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
                      <v-col cols="12" sm="12" md="12" class="pb-0">
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
                                @blur="drenagemSerossanguinea = removeLeftZeros(drenagemSerossanguinea)"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pb-0">
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
                                @blur="drenagemGastrica = removeLeftZeros(drenagemGastrica)"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pb-0">
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
                                @blur="drenagemDuodenal = removeLeftZeros(drenagemDuodenal)"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pb-0">
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
                                @blur="drenagemBile = removeLeftZeros(drenagemBile)"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pb-0">
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
                                @blur="drenagemIleal = removeLeftZeros(drenagemIleal)"
                              ></v-text-field>
                            </validation-provider>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pb-0">
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
                                @blur="drenagemColica = removeLeftZeros(drenagemColica)"
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
                        <span>{{ sodio.toFixed() }} mEq</span>
                      </v-col>
                      <!-- Potássio -->
                      <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                        <h3>Potássio</h3>
                        <v-divider class="mx-3"></v-divider>
                        <span>{{ potassio.toFixed() }} mEq</span>
                      </v-col>
                      <!-- Cloreto -->
                      <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                        <h3>Cloreto</h3>
                        <v-divider class="mx-3"></v-divider>
                        <span>{{ cloreto.toFixed() }} mEq</span>
                      </v-col>
                      <!-- Bicarbonato -->
                      <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                        <h3>Bicarbonato</h3>
                        <v-divider class="mx-3"></v-divider>
                        <span>{{ bicarbonato.toFixed() }} mEq</span>
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
                        @blur="diurese = removeLeftZeros(diurese)"
                      ></v-text-field>
                    </validation-provider>
                    <!-- Insensíveis -->
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
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
                        </v-row>
                      </v-col>
                      <!-- Adicionar Campos de Febre -->
                      <v-col cols="12" sm="12" md="12" class="d-flex justify-end py-0">
                        <v-btn
                          fab
                          dark
                          x-small
                          color="primary"
                          class="scale-houver"
                          style="height: 20px;width: 20px;"
                          @click="febres.push({ id: Math.floor(Math.random() * 100), possuiFebre: false, febre: 37.2 })"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                      <template v-for="(camposFebre, index) in febres">
                        <v-col :key="camposFebre.id" cols="12" sm="12" md="12" class="pt-0">
                          <v-row>
                            <!-- Insensíveis Febre -->
                            <v-col cols="12" sm="5" md="6">
                              <v-text-field
                                v-if="index === 0"
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
                                v-model="camposFebre.possuiFebre"
                                class="ma-0"
                                @change="resetFebre(camposFebre)"
                              >
                                <template v-slot:label>
                                  <small>Possui febre?</small>
                                </template>
                              </v-checkbox>
                            </v-col>
                            <!-- Febre -->
                            <v-col cols="12" sm="3" md="3" class="d-flex align-center">
                              <validation-provider
                                v-slot="{ errors }"
                                name="Febre"
                                rules="required|double"
                              >
                                <v-text-field
                                  v-model="camposFebre.febre"
                                  :error-messages="errors"
                                  label="Febre"
                                  required
                                  suffix="°C"
                                  type="number"
                                  min="37.2"
                                  :disabled="!camposFebre.possuiFebre"
                                  @change="setFebre(camposFebre)"
                                ></v-text-field>
                              </validation-provider>
                              <v-btn
                                v-if="index !== 0"
                                fab
                                dark
                                x-small
                                color="red"
                                class="scale-houver ml-3"
                                style="height: 20px;width: 20px;"
                                @click="febres.splice(febres.indexOf(camposFebre), 1)"
                              >
                                <v-icon dark>
                                  mdi-minus
                                </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </template>
                      <v-col cols="12" sm="12" md="12">
                        <v-row>
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
                        <span>{{ ganhos }} ml</span>
                        <h3>-</h3>
                      </v-col>
                      <!-- Perdas Valores -->
                      <v-col cols="12" sm="4" md="4" class="d-flex justify-space-between">
                        <span>{{ perdas }} ml</span>
                        <h3>=</h3>
                      </v-col>
                      <!-- Total Valores -->
                      <v-col cols="12" sm="4" md="4" class="d-flex justify-center">
                        <span :class="ganhos - perdas > 0 ? 'success--text' : 'red--text'">
                          {{ ganhos - perdas }} ml
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                </transition>
                <!-- Resultado / Prescrição -->
                <transition name="slide">
                  <div v-if="mostrarResultado">
                    <h2 class="mb-5">Cálculo NBD</h2>
                    <v-row class="mb-3">
                      <!-- Água -->
                      <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                        <h3>Água</h3>
                        <v-divider class="mx-3"></v-divider>
                        <span>
                          {{ kg * 30 }} - {{ kg * 40 }} ml
                        </span>
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
                        <span>{{ (((kg * 1.0) + sodio) / 17.1).toFixed() }} - {{ (((kg * 1.5) + sodio) / 17.1).toFixed() }}</span>
                      </v-col>
                      <!-- Ampola KCl -->
                      <v-col v-if="!temPosOperatorioImediato" cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                        <h3>Ampolas KCl 10%</h3>
                        <v-divider class="mx-3"></v-divider>
                        <span>{{ (((kg * 1.0) + potassio) / 13.5).toFixed() }}</span>
                      </v-col>
                      <!-- Bolsas SG -->
                      <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center">
                        <h3>Bolsas 500 ml SG 50%</h3>
                        <v-divider class="mx-3"></v-divider>
                        <span>
                          {{ ganhos - perdas > 0
                            ? ((kg * 30) / 500).toFixed()
                            : (((kg * 30) + (ganhos - perdas) * (-1)) / 500).toFixed()
                          }} - {{ ganhos - perdas > 0
                            ? ((kg * 40) / 500).toFixed()
                            : (((kg * 40) + (ganhos - perdas) * (-1)) / 500).toFixed()
                          }}
                        </span>
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
                        <span>
                          {{ ganhos - perdas > 0
                            ? ((kg * 30) / 500).toFixed()
                            : (((kg * 30) + (ganhos - perdas) * (-1)) / 500).toFixed()
                          }} - {{ ganhos - perdas > 0
                            ? ((kg * 40) / 500).toFixed()
                            : (((kg * 40) + (ganhos - perdas) * (-1)) / 500).toFixed()
                          }}
                        </span>
                      </v-col>
                      <!-- + SG -->
                      <v-col cols="12" sm="12" md="12" class="d-flex justify-space-between align-center pt-0">
                        <h3>SG 50%</h3>
                        <v-divider class="mx-3"></v-divider>
                        <span>+ mínimo 200 - 300 ml</span>
                      </v-col>
                    </v-row>

                    <v-divider class="mb-5"></v-divider>

                    <h3 style="color: mediumvioletred;">Gotejamento:
                      {{ ganhos - perdas > 0
                        ? ((kg * 30) / 500).toFixed() * 7
                        : (((kg * 30) + (ganhos - perdas) * (-1)) / 500).toFixed() * 7
                      }} - {{ ganhos - perdas > 0
                        ? ((kg * 40) / 500).toFixed() * 7
                        : (((kg * 40) + (ganhos - perdas) * (-1)) / 500).toFixed() * 7
                      }} gotas/min (24h)
                    </h3>
                  </div>
                </transition>

                <!-- Calcular -->
                <v-card-actions class="mt-5">
                  <v-btn
                    type="submit"
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
import removeLeftZeros from '@/mixins/remove-left-zeros.js'

export default {
  name: 'CalculadoraSoro',
  mixins: [removeLeftZeros],
  data: () => ({
    valid: true,
    kg: '',
    temPosOperatorioImediato: true,
    diaPosOperatorio: 1,
    soroGanho: '',
    liquidoIngerido: '',
    outros: '',
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
    sodioGastrica: 0,
    potassioGastrica: 0,
    cloretoGastrica: 0,
    bicarbonatoGastrica: 0,
    sodioDuodenal: 0,
    potassioDuodenal: 0,
    cloretoDuodenal: 0,
    bicarbonatoDuodenal: 0,
    sodioBile: 0,
    potassioBile: 0,
    cloretoBile: 0,
    bicarbonatoBile: 0,
    sodioSucoPancreatico: 0,
    potassioSucoPancreatico: 0,
    cloretoSucoPancreatico: 0,
    bicarbonatoSucoPancreatico: 0,
    sodioIleal: 0,
    potassioIleal: 0,
    cloretoIleal: 0,
    bicarbonatoIleal: 0,
    sodioColica: 0,
    potassioColica: 0,
    cloretoColica: 0,
    bicarbonatoColica: 0,
    diurese: '',
    insensiveisTemperaturaDoDia: 1000,
    temperaturaDoDia: 29,
    febres: [
      { id: Math.floor(Math.random() * 100), possuiFebre: false, febre: 37.2 }
    ],
    insensiveisTaquipneia: 0,
    taquipneia: 0,
    mostrarResultado: false
  }),
  computed: {
    insensiveisFebre: {
      get() {
        let somaInsensiveisFebre = 0
        this.febres.forEach((f) => {
          somaInsensiveisFebre += f.febre > 37.2 && f.febre - 37.2 >= 1
            ? Math.trunc((f.febre - 37.2)) * 100
            : 0
        })
        return somaInsensiveisFebre
      },
      set(value) {
        return value
      }
    },
    insensiveis() {
      return this.insensiveisTemperaturaDoDia + this.insensiveisFebre + this.insensiveisTaquipneia
    },
    ganhos() {
      let somaGanhos = 400
      if(!isNaN(parseInt(this.soroGanho))) somaGanhos += parseInt(this.soroGanho)
      if(!isNaN(parseInt(this.liquidoIngerido))) somaGanhos += parseInt(this.liquidoIngerido)
      if(!isNaN(parseInt(this.outros))) somaGanhos += parseInt(this.outros)
      return somaGanhos
    },
    perdas() {
      let somaPerdas = parseInt(this.insensiveis)
      if(!isNaN(parseInt(this.drenagemSerossanguinea))) somaPerdas += parseInt(this.drenagemSerossanguinea)
      if(!isNaN(parseInt(this.drenagemGastrica))) somaPerdas += parseInt(this.drenagemGastrica)
      if(!isNaN(parseInt(this.drenagemDuodenal))) somaPerdas += parseInt(this.drenagemDuodenal)
      if(!isNaN(parseInt(this.drenagemBile))) somaPerdas += parseInt(this.drenagemBile)
      if(!isNaN(parseInt(this.drenagemSucoPancreatico))) somaPerdas += parseInt(this.drenagemSucoPancreatico)
      if(!isNaN(parseInt(this.drenagemIleal))) somaPerdas += parseInt(this.drenagemIleal)
      if(!isNaN(parseInt(this.drenagemColica))) somaPerdas += parseInt(this.drenagemColica)
      if(!isNaN(parseInt(this.diurese))) somaPerdas += parseInt(this.diurese)
      return somaPerdas
    },
    sodio() {
      return this.sodioGastrica + this.sodioDuodenal + this.sodioBile + this.sodioSucoPancreatico + this.sodioIleal + this.sodioColica
    },
    potassio() {
      return this.potassioGastrica + this.potassioDuodenal + this.potassioBile + this.potassioSucoPancreatico + this.potassioIleal + this.potassioColica
    },
    cloreto() {
      return this.cloretoGastrica + this.cloretoDuodenal + this.cloretoBile + this.cloretoSucoPancreatico + this.cloretoIleal + this.cloretoColica
    },
    bicarbonato() {
      return this.bicarbonatoGastrica + this.bicarbonatoDuodenal + this.bicarbonatoBile + this.bicarbonatoSucoPancreatico + this.bicarbonatoIleal + this.bicarbonatoColica
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
    },
    houveDrenagemBile(newHouveDrenagemBile) {
      if(!newHouveDrenagemBile) this.drenagemBile = 0
    },
    houveDrenagemSucoPancreatico(newHouveDrenagemSucoPancreatico) {
      if(!newHouveDrenagemSucoPancreatico) this.drenagemSucoPancreatico = 0
    },
    houveDrenagemIleal(newHouveDrenagemIleal) {
      if(!newHouveDrenagemIleal) this.drenagemIleal = 0
    },
    houveDrenagemColica(newHouveDrenagemColica) {
      if(!newHouveDrenagemColica) this.drenagemColica = 0
    },
    drenagemGastrica(newDrenagemGastrica) {
      if(newDrenagemGastrica > 0) {
        this.sodioGastrica = (newDrenagemGastrica * 60) / 1000
        this.potassioGastrica = (newDrenagemGastrica * 10) / 1000
        this.cloretoGastrica = (newDrenagemGastrica * 130) / 1000
        this.bicarbonatoGastrica = 0
      }
    },
    drenagemDuodenal(newDrenagemDuodenal) {
      if(newDrenagemDuodenal > 0) {
        this.sodioDuodenal = (newDrenagemDuodenal * 140) / 1000
        this.potassioDuodenal = (newDrenagemDuodenal * 5) / 1000
        this.cloretoDuodenal = (newDrenagemDuodenal * 80) / 1000
        this.bicarbonatoDuodenal = (newDrenagemDuodenal * 10) / 1000
      }
    },
    drenagemBile(newDrenagemBile) {
      if(newDrenagemBile > 0) {
        this.sodioBile = (newDrenagemBile * 145) / 1000
        this.potassioBile = (newDrenagemBile * 5) / 1000
        this.cloretoBile = (newDrenagemBile * 100) / 1000
        this.bicarbonatoBile = (newDrenagemBile * 35) / 1000
      }
    },
    drenagemSucoPancreatico(newDrenagemSucoPancreatico) {
      if(newDrenagemSucoPancreatico > 0) {
        this.sodioSucoPancreatico = (newDrenagemSucoPancreatico * 140) / 1000
        this.potassioSucoPancreatico = (newDrenagemSucoPancreatico * 5) / 1000
        this.cloretoSucoPancreatico = (newDrenagemSucoPancreatico * 75) / 1000
        this.bicarbonatoSucoPancreatico = (newDrenagemSucoPancreatico * 115) / 1000
      }
    },
    drenagemIleal(newDrenagemIleal) {
      if(newDrenagemIleal > 0) {
        this.sodioIleal = (newDrenagemIleal * 140) / 1000
        this.potassioIleal = (newDrenagemIleal * 5) / 1000
        this.cloretoIleal = (newDrenagemIleal * 140) / 1000
        this.bicarbonatoIleal = (newDrenagemIleal * 30) / 1000
      }
    },
    drenagemColica(newDrenagemColica) {
      if(newDrenagemColica > 0) {
        this.sodioColica = (newDrenagemColica * 60) / 1000
        this.potassioColica = (newDrenagemColica * 30) / 1000
        this.cloretoColica = (newDrenagemColica * 40) / 1000
        this.bicarbonatoColica = 0
      }
    }
  },
  methods: {
    async submit() {
      if(await this.$refs.observer.validate()) {
        this.mostrarResultado = true
      } else {
        // window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    resetFebre(camposFebre) {
      if(!camposFebre.possuiFebre) {
        this.insensiveisFebre -= camposFebre.febre
        camposFebre.febre = 37.2
      }
    },
    setFebre(camposFebre) {
      this.insensiveisFebre = camposFebre.febre > 37.2 && camposFebre.febre - 37.2 >= 1
        ? Math.trunc((camposFebre.febre - 37.2)) * 100
        : 0
    }
  }
}
</script>

<style scoped>
/* Animação transition */
.slide-enter, .slide-leave-to {
  opacity: 0;
}

.slide-enter-active {
  animation: slide 0.7s;
  transition: opacity 0.7s;
}

.slide-leave-active {
  animation: slide 0.7s reverse;
  transition: opacity 0.7s;
}

@keyframes slide {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(0px);
  }
}

.scale-houver:hover {
  transform: scale(1.1);
}
</style>
