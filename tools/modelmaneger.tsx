import {
  Box3,
  BufferGeometry,
  LoadingManager,
  Mesh,
  MeshPhongMaterial,
  TextureLoader,
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/'

/**
 * @param obj obj file path
 * @param mtl mtl file path
 */
type LoaderModelType = {
  obj: string;
  mtl: string;
  img: string;
  id: string;
  success?: (obj: THREE.Group) => any;
  fallback?: () => any;
};

type ModelListType = {
  id: string;
  model: Mesh<BufferGeometry, MeshPhongMaterial>;
};
// 暂时仅支持obj file
export class ModelManeger {
  manager!: LoadingManager;

  objLoader!: OBJLoader;

  mtlLoader!: MTLLoader;

  mapLoader!: TextureLoader;

  modelList: ModelListType[] = [];

  constructor() {
    this.manager = new LoadingManager()
    this.objLoader = new OBJLoader(this.manager)
    this.mtlLoader = new MTLLoader(this.manager)
    this.mapLoader = new TextureLoader(this.manager)

    // this.manager.onStart = function onStart(url, itemsLoaded, itemsTotal) {
    //   console.log(
    //     `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`,
    //   )
    // }

    // this.manager.onLoad = function onLoad() {
    //   console.log('Loading complete!')
    // }

    // this.manager.onProgress = function onProgress(
    //   url,
    //   itemsLoaded,
    //   itemsTotal,
    // ) {
    //   console.log(
    //     `Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`,
    //   )
    // }

    // this.manager.onError = function onError(url) {
    //   console.log(`There was an error loading ${url}`)
    // }
  }

  loadModel: (arg: LoaderModelType) => Promise<THREE.Group> = async ({
    obj,
    mtl,
    img,
    id,
    success,
    // fallback,
  }) => new Promise((res) => {
    this.mtlLoader.load(mtl, (materials) => {
      materials.preload()
      this.objLoader.setMaterials(materials)
      this.objLoader.load(obj, (object) => {
        object.traverse((child) => {
          if (child instanceof Mesh) {
            const { geometry, material } = child as Mesh<
                BufferGeometry,
                MeshPhongMaterial
              >
            const val = 1 / 6.4
            geometry.scale(val, val, val)

            material.map = this.mapLoader.load(img)
            new Box3().setFromObject(child)

            this.modelList.push({
              id,
              model: child,
            })
          }
        })
        success?.(object)
        res(object)
      })
    })
  });

  updateOnload = (callback: () => unknown) => {
    this.manager.onLoad = callback
  };
}
