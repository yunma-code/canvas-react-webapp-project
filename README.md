Authors: Yun Ma, Jiashu Qian, Yiqian Li.

#### Git Flow
- **`main` branch**: Code is only merged here once features are fully developed and tested.
- **`develop` branch**: Features are merged here for testing.
- **`feature/*`branch**: for members ro develop specific features, e.g., `feature/feature-001-name`.

#### Workflow
1. Pull the latest code from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Create a feature branch
   ```bash
   git checkout -b feature/feature-001-name
   ```
3. Develop and commit changes on your branch
   ```bash
   git add .
   git commit -m "Add feature-001-name"
   ```
4. Regularly pull updates from develop to stay updated
   ```bash
   git pull origin develop
   ```
5. Push the feature branch to remote
   ```bash
   git push origin feature/feature-001-name
   ```


#### Pull Request (PR)
1. Create a PR to merge `feature/feature-001-name` into `develop`.
2. Code review: One team member code review.
3. Merge to `develop`.
4. After week's testing, merge `develop` into `main` and proceed with the final release.